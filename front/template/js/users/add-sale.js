function getJWTFromCookie() {
    const name = 'token='
    const cookieArray = document.cookie.split(';')
    for (let i = 0; i < cookieArray.length; i++) {
        let cookie = cookieArray[i].trim() // trim ile baştaki ve sondaki boşlukları temizleyin
        if (cookie.indexOf(name) === 0) {
            return decodeURIComponent(cookie.substring(name.length, cookie.length)) // Değerini decode edin
        }
    }
    return null
}
const jwt = getJWTFromCookie()

async function getSale(saleId) {
    try {
        let response = await axios.post(
            'http://localhost:3001/api/v1/crm/sale/getSale',
            { saleId },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer YOUR_TOKEN_HERE', // Buraya gerçek token'ı koy
                },
            },
        )

        return response.data
    } catch (error) {
        console.error('Satış bilgilerini alma hatası:', error)
        throw error
    }
}

async function updateSale(saleId, updatedData) {
    try {
        let response = await axios.post(
            `http://localhost:3001/api/v1/crm/sale/updateSale?saleId=${saleId}`,
            updatedData,
            {
                headers: {
                    Authorization: 'Bearer YOUR_TOKEN_HERE', // Buraya gerçek token'ı koyun
                },
            },
        )

        return response.data
    } catch (error) {
        console.error('Satış güncelleme hatası:', error)
        throw error
    }
}

async function deleteSale(saleId) {
    try {
        const response = await axios.post(
            'http://localhost:3001/api/v1/crm/sale/deleteSale',
            { saleId },
            {
                headers: {
                    Authorization: 'Bearer YOUR_TOKEN_HERE', // Buraya gerçek token'ı koy
                },
            },
        )

        if (response.status === 200) {
            console.log('Satış başarıyla silindi:', response.data)
        }

        return response.data
    } catch (error) {
        console.error('Silme işlemi hatası:', error)
    }
}

async function setSale(saleData) {
    try {
        const response = await axios.post(
            'http://localhost:3001/api/v1/crm/sale/setSale',
            saleData,
            {
                headers: {
                    Authorization: 'Bearer YOUR_TOKEN_HERE',
                },
            },
        )
        return response.data
    } catch (error) {
        console.error('Satış ekleme hatası:', error)
        throw error
    }
}

async function getCategory() {
    try {
        const response = await axios.post(
            'http://localhost:3001/api/v1/crm/product/getCategory',
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer YOUR_TOKEN_HERE',
                },
            },
        )
        return response.data
    } catch (error) {
        console.error('Kategori alma hatası:', error)
        throw error
    }
}

async function getCurrency() {
    try {
        const response = await axios.post(
            'http://localhost:3001/api/v1/crm/product/getCurrency',
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer YOUR_TOKEN_HERE',
                },
            },
        )
        return response.data
    } catch (error) {
        console.error('Para birimi alma hatası:', error)
        throw error
    }
}

async function getTaxRate() {
    try {
        const response = await axios.post(
            'http://localhost:3001/api/v1/crm/product/getTaxRate',
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer YOUR_TOKEN_HERE',
                },
            },
        )
        return response.data
    } catch (error) {
        console.error('Vergi oranı alma hatası:', error)
        throw error
    }
}

async function getPaymentType() {
    try {
        const response = await axios.post(
            'http://localhost:3001/api/v1/crm/product/getPaymentType',
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer YOUR_TOKEN_HERE',
                },
            },
        )
        return response.data
    } catch (error) {
        console.error('Ödeme türü alma hatası:', error)
        throw error
    }
}

async function getCustomer(customerId) {
    try {
        const response = await axios.post(
            'http://localhost:3001/api/v1/crm/customer/getCustomer',
            { customerId },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer YOUR_TOKEN_HERE',
                },
            },
        )
        return response.data.data
    } catch (error) {
        console.error('Müşteri bilgilerini alma hatası:', error)
        throw error
    }
}

async function getProduct(productId) {
    try {
        const response = await axios.post(
            'http://localhost:3001/api/v1/crm/product/getProduct',
            { productId },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer YOUR_TOKEN_HERE',
                },
            },
        )
        return response.data.data
    } catch (error) {
        console.error('Ürün bilgilerini alma hatası:', error)
        throw error
    }
}

async function deleteStock(productId, quantity) {
    try {
        const stockData = {
            productId: productId,
            quantity: quantity,
        }

        const response = await axios.post(
            'http://localhost:3001/api/v1/crm/product/deleteStock',
            stockData,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer YOUR_TOKEN_HERE',
                },
            },
        )

        return response.data
    } catch (error) {
        console.error('Stok silme hatası:', error)
        throw error
    }
}

async function setStockAction(productId, quantity, actionType) {
    try {
        const stockActionData = {
            productId: productId,
            quantity: quantity,
            type: actionType,
        }

        const response = await axios.post(
            'http://localhost:3001/api/v1/crm/product/setStockAction',
            stockActionData,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer YOUR_TOKEN_HERE',
                },
            },
        )

        return response.data
    } catch (error) {
        console.error('Stok hareket kaydı ekleme hatası:', error)
        throw error
    }
}

document.addEventListener('DOMContentLoaded', async function () {
    try {

        let payload;

        if (jwt && jwt.split('.').length === 3) {
            console.log('Cookie içindeki JWT:', jwt);
            try {
                const parts = jwt.split('.');
                const header = JSON.parse(atob(parts[0]));
                payload = JSON.parse(decodeURIComponent(escape(window.atob(parts[1]))));

                console.log('Header:', header);
                console.log('Payload:', payload);
            } catch (error) {
                console.error('Geçersiz JWT formatı:', error);
                window.location.href = 'file:///C:/Users/Demir/Desktop/Yusuf2/yusuf/front/template/pages/users/login-page.html';
            }
        } else {
            window.location.href = 'file:///C:/Users/Demir/Desktop/Yusuf2/yusuf/front/template/pages/users/login-page.html';
            console.log('JWT cookie bulunamadı veya geçersiz formatta.');
        }

        const customers = await getCustomer();
        const products = await getProduct();
        const categories = await getCategory();
        const currencies = await getCurrency();
        const taxRates = await getTaxRate();
        const paymentTypes = await getPaymentType();

        const customerSelect = document.getElementById('customer-select');
        const productSelect = document.getElementById('product-select');
        const quantityInput = document.getElementById('quantity');
        const salePriceInput = document.getElementById('sale-price');
        const totalPriceInput = document.getElementById('total-price');
        const netPriceInput = document.getElementById('net-price');
        const salePaymentInput = document.getElementById('sale-payment');
        const additionalCostInput = document.getElementById('additional-costs-price');
        const productList = document.getElementById('product-list');

        if (customers && customers.length > 0) {
            customers.forEach((customer) => {
                const option = document.createElement('option');
                option.value = customer._id;
                option.textContent = `${customer.companyName}`;
                customerSelect.appendChild(option);
            });
        } else {
            console.error('Müşteri verisi alınamadı!');
        }

        if (products && products.length > 0) {
            products.forEach((product) => {
                const option = document.createElement('option');
                option.value = product._id;
                option.textContent = `${product.productName}`;
                productSelect.appendChild(option);
            });
        } else {
            console.error('Ürün verisi alınamadı!');
        }

        customerSelect.addEventListener('change', function () {
            const selectedCustomerId = customerSelect.value;
            const selectedCustomer = customers.find(
                (customer) => customer._id === selectedCustomerId
            );
            if (selectedCustomer) {
                document.getElementById('customer-type').value = selectedCustomer.companyType;
                document.getElementById('customer-tax-id').value = selectedCustomer.taxNumber;
                document.getElementById('customer-address').value = selectedCustomer.address;
                document.getElementById('customer-phone').value = selectedCustomer.phone;
                document.getElementById('customer-email').value = selectedCustomer.email;
            }
        });

        let selectedProduct;
        productSelect.addEventListener('change', function () {
            const selectedProductId = productSelect.value;
            selectedProduct = products.find((product) => product._id === selectedProductId);

            if (selectedProduct) {
                const category = categories.data.find(
                    (category) => category._id === selectedProduct.category
                );
                const currency = currencies.data.find(
                    (currency) => currency._id === selectedProduct.currency
                );
                const taxRate = taxRates.data.find(
                    (taxRate) => taxRate._id === selectedProduct.taxRate
                );

                document.getElementById('product-category').value = category ? category.name : '';
                document.getElementById('product-description').value = selectedProduct.description;
                document.getElementById('product-price').value = selectedProduct.unitPrice;
                document.getElementById('product-currency').value = currency ? currency.name : '';
                document.getElementById('product-tax-rate').value = taxRate ? `${taxRate.name} - ${taxRate.rate}` : '';
                document.getElementById('product-tax-included').value = selectedProduct.taxIncluded ? 'Evet' : 'Hayır';
                document.getElementById('product-stock').value = selectedProduct.stock;

                updateCostPrice();
                updateTotalPrice();
            }
        });

        quantityInput.addEventListener('input', updateCostPrice);
        salePriceInput.addEventListener('input', updateTotalPrice);
        quantityInput.addEventListener('input', updateTotalPrice);

        function updateCostPrice() {
            if (selectedProduct) {
                const quantity = parseFloat(quantityInput.value) || 1;
                const costPrice = selectedProduct.unitPrice * quantity;
                document.getElementById('cost-price').value = costPrice.toFixed(2);
                updateTotalPrice();
            }
        }

        function updateTotalPrice() {
            const salePrice = parseFloat(salePriceInput.value) || 0;
            const quantity = parseFloat(quantityInput.value) || 1;
            const taxIncluded = selectedProduct.taxIncluded;
            const taxRate = taxRates.data.find(
                (taxRate) => taxRate._id === selectedProduct.taxRate
            );
            const taxMultiplier = taxRate ? 1 + taxRate.rate / 100 : 1;

            let totalPrice = 0;
            if (taxIncluded) {
                totalPrice = salePrice * quantity * taxMultiplier;
            } else {
                totalPrice = salePrice * quantity;
            }

            totalPriceInput.value = totalPrice.toFixed(2);
            updateNetPrice();
        }

        function updateNetPrice() {
            let totalPrice = 0;

            const rows = productList.getElementsByTagName('tr');
            for (let i = 0; i < rows.length; i++) {
                const row = rows[i];
                const totalPriceCell = row.cells[3];
                totalPrice += parseFloat(totalPriceCell.textContent) || 0;
            }

            const additionalCost = parseFloat(additionalCostInput.value) || 0;
            totalPrice += additionalCost;

            const salePayment = parseFloat(document.getElementById('sale-payment').value) || 0;
            totalPrice -= salePayment;

            netPriceInput.value = totalPrice.toFixed(2);
        }

        additionalCostInput.addEventListener('input', function () {
            updateNetPrice();
        });

        document.getElementById('sale-payment').addEventListener('input', function () {
            updateNetPrice();
        });

        let salesProduct = [];

        document.getElementById('add-product-button').addEventListener('click', function () {
            const productId = productSelect.value;
            const product = products.find((p) => p._id === productId);
            const quantity = parseFloat(quantityInput.value) || 1;

            if (product && product.stock < quantity) {
                Swal.fire({
                    icon: 'warning',
                    title: 'Stok Yetersiz!',
                    text: `Seçtiğiniz üründen en fazla ${product.stock} adet alabilirsiniz.`,
                });
                return;
            }

            const salePrice = parseFloat(salePriceInput.value) || 0;
            const totalPrice = parseFloat(totalPriceInput.value) || 0;
            const costPrice = parseFloat(document.getElementById('cost-price').value) || 0;

            if (product) {
                const row = productList.insertRow();
                row.innerHTML = `
                    <td>${product.productName}</td>
                    <td>${salePrice}</td>
                    <td>${quantity}</td>
                    <td>${totalPrice.toFixed(2)}</td>
                    <td><button class=" remove-product-btn">- Eksi</button></td>
                `;

                row.querySelector('.remove-product-btn').addEventListener('click', function () {
                    productList.deleteRow(row.rowIndex);
                    salesProduct = salesProduct.filter(sp => sp.productId !== productId);
                    updateNetPrice();
                });

                const newProduct = {
                    productId,
                    quantity,
                    salePrice,
                    totalPrice,
                    costPrice
                };
                salesProduct.push(newProduct);

                updateNetPrice();

                productSelect.selectedIndex = 0;
                quantityInput.value = "";
                salePriceInput.value = "";
                totalPriceInput.value = "";
                salePaymentInput.value = "";
                document.getElementById('cost-price').value = "";
                document.getElementById('product-category').value = "";
                document.getElementById('product-description').value = "";
                document.getElementById('product-price').value = "";
                document.getElementById('product-currency').value = "";
                document.getElementById('product-tax-rate').value = "";
                document.getElementById('product-tax-included').value = "";
                document.getElementById('product-stock').value = "";
            }
        });

        document.getElementById('salesForm').addEventListener('submit', async function (event) {
            event.preventDefault();
        
            const customerId = customerSelect.value;
            const paymentPlan = document.getElementById('payment-plan').value;
            const netPrice = parseFloat(document.getElementById('net-price').value);
            const salePayment = parseFloat(document.getElementById('sale-payment').value) || 0;
            const additionalCostsDescription = document.getElementById('additional-costs-description').value;
            const additionalCostsPrice = parseFloat(document.getElementById('additional-costs-price').value) || 0;
            const description = document.getElementById('description').value;

            let paymentStatus = "Ödenmedi"; 
            if (salePayment >= netPrice) {
                paymentStatus = "Tamamlandı";
            } else if (salePayment > 0) {
                paymentStatus = "Kısmen Ödendi";
            }
        
            const saleData = {
                customerId,
                saleProducts: salesProduct,
                paymentPlan,
                paymentStatus,
                additionalCostsDescription,
                additionalCostsPrice,
                netPrice,
                ...(salePayment !== 0 && { salePayment }),
                description,
            };
        
            console.log("saleData", saleData);
            try {
                const response = await setSale(saleData);
                console.log('Sale added:', response);
        
                Swal.fire({
                    icon: 'success',
                    title: 'Satış Başarılı!',
                    text: 'Satış başarıyla eklendi!',
                }).then(() => {
                    window.location.href = "user-list.html";
                });
            } catch (error) {
                console.error('Error adding sale:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Hata!',
                    text: 'Bir hata oluştu.',
                });
            }
        });
        
    } catch (error) {
        console.error('Error loading data:', error);
    }
});