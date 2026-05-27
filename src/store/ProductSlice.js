import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const BACKEND_URL = import.meta.env.VITE_BACKEND_API

export const getAllProducts = createAsyncThunk('/getProducts', 
    async (token, { rejectWithValue }) => { 
        try {
            const response = await fetch(`${BACKEND_URL}/products`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                }
            })
            const data = await response.json()

            if (!response.ok) { 
                rejectWithValue(data?.message || "Internal Server Error")
            }

            return data
        } catch (error) { 
            rejectWithValue(error?.message)
        }
    }
)

export const deleteProduct = createAsyncThunk('/deleteProduct', async (barcode, { rejectWithValue }) => { 
    try {
        const response = await fetch(`${BACKEND_URL}/product/${barcode}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            }
        })

        const result = await response.json()

        if (!response.ok) { 
            rejectWithValue(result?.message || "Product not delete")
        }

        return result

    } catch (error) {
        rejectWithValue(error?.message || "Internal Server Error")
     }
})

export const addProduct = createAsyncThunk('/addProduct', async (productData, { rejectWithValue }) => { 
    try {
        const response = await fetch(`${BACKEND_URL}/products`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(productData)
        })

        const result = await response.json()

        if (!response.ok) { 
            rejectWithValue(result?.message || "Product not delete")
        }

        return result
    } catch (error) { 
        rejectWithValue(error?.message || "Internal Server Error")
    }
})

export const updateProduct = createAsyncThunk('/updateProduct', async ({ productData, barcode }, { rejectWithValue }) => { 
    try {
        const response = await fetch(`${BACKEND_URL}/product/${barcode}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(productData)
        })

        const result = await response.json()

        if (!response.ok) { 
            rejectWithValue(result?.message || "Product not update")
        }

        return result
    } catch (error) { 
        rejectWithValue(error?.message || "Internal Server Error")
    }
})

const ProductSlice = createSlice({
    name: 'product_slice',
    initialState: {
        products: [],
        loading: true,
        currentProduct: null,
    },
    reducers: {
        modelOpen(state, action) {
            state.currentProduct = action.payload
            state.isModalOpen = true
        }
    },
    extraReducers: (builders) => {
        builders
            .addCase(getAllProducts.pending, (state, action) => {
                state.loading = true
            })
            .addCase(getAllProducts.fulfilled, (state, action) => {
                state.products = action.payload
                state.loading = false
            })
            .addCase(getAllProducts.rejected, (state, action) => { 
                state.loading = false
            })
            .addCase(deleteProduct.pending, (state, action) => { 
                state.loading = true
            })
            .addCase(deleteProduct.fulfilled, (state, action) => { 
                state.products = state.products.filter(product => product.barcode != action.payload.barcode)
                state.loading = false
            })
            .addCase(deleteProduct.rejected, (state, action) => { 
                state.loading = false
            })
            .addCase(addProduct.pending, (state, action) => { 
                state.loading = true
            })
            .addCase(addProduct.fulfilled, (state, action) => { 
                state.products.push(action.payload.product)
                state.loading = false
            })
            .addCase(addProduct.rejected, (state, action) => { 
                state.loading = false
            })
            .addCase(updateProduct.pending, (state, action) => { 
                state.loading = true
            })
            .addCase(updateProduct.fulfilled, (state, action) => { 
                state.currentProduct = null
                const updateProductIndex = state.products.findIndex(product => product.barcode == action.payload.product.barcode)

                if (updateProductIndex != -1) { 
                    state.products[updateProductIndex] = action.payload.product
                }

                state.loading = false
            })
            .addCase(updateProduct.rejected, (state, action) => { 
                state.loading = false
            })
    }
})

export const productActions = ProductSlice.actions

export default ProductSlice