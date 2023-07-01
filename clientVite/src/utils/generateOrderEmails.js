import { sum } from 'src/utils/formatNumbers'

const processingOrder = (checkout) => {
	const todayDate = new Date()
	const months = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	]

	return `
        <div style="width:500px;text-align:center;margin:auto">
            <img src="https://www.taakad.com/images/common/logo.png" width="140" style="margin:auto" />
        </div>
        <div style="width:500px;border-radius:5px;overflow:hidden;margin:auto;border: 1px solid #dedede;font-family: sans-serif">
            <div style="padding:1rem;background-color:#003056;color:#fff">
            <p style="text-align:center;font-size:26px">
                Thanks for ordering with us!
            </p>
            </div>
            <div style="padding:1rem 2rem">
            <div style="color:#1f1f1f;border-bottom:1px solid #dedede">
                <p style="font-size:16px">
                Hi ${
									checkout.customerInfo.firstname.charAt(0).toUpperCase() + checkout.customerInfo.firstname.slice(1)
								},
                </p>
                <p style="font-size:16px;margin-left:8px">
                Just to let you know — we've received your order, and it is now being processed:
                </p>
            </div>
            <div style="margin-top:1rem;border-bottom:1px solid #dedede;">
                <p style="color:#636363;font-size:14px">
                We will send another email when your data is fully populated in a few minutes.
                </p>
            </div>
            <div style="margin-top:2rem">
                <p style="font-size:18px;font-weight:bold">
                ${`${months[todayDate.getMonth()]} ${todayDate.getDate()}, ${todayDate.getFullYear()}`}
                </p>
                <div>
                <div style="display:flex">
                    <div style="width:40%;border:2px solid #E5E5E5;">
                    <p style="margin-left:10px;font-weight:bold;color:#636363">
                        Product
                    </p>
                    </div>
                    <div style="width:30%;border:2px solid #E5E5E5;">
                    <p style="margin-left:10px;font-weight:bold;color:#636363">
                        Quantity
                    </p>
                    </div>
                    <div style="width:30%;border:2px solid #E5E5E5;">
                    <p style="margin-left:10px;font-weight:bold;color:#636363">
                        Price
                    </p>
                    </div>
                </div>
                <div style="display:flex">
                ${checkout.checkoutOrders.map(
									(node, index) =>
										`<div style="width:40%;border:2px solid #E5E5E5;">
                     <p style="margin-left:10px;color:#636363">
                         ${node.model} All in One Information
                     </p>
                     </div>
                     <div style="width:30%;border:2px solid #E5E5E5;">
                     <p style="margin-left:10px;color:#636363">
                         1
                     </p>
                     </div>
                     <div style="width:30%;border:2px solid #E5E5E5;">
                     <p style="margin-left:10px;color:#636363">
                         $${node.price}
                     </p>
                 </div>`,
								)}
                    
                </div>
                <div style="display:flex">
                    <div style="width:70%;border:2px solid #E5E5E5;">
                    <p style="margin-left:10px;font-weight:bold;color:#636363">
                        Subtotal:
                    </p>
                    </div>
                    <div style="width:30%;border:2px solid #E5E5E5;">
                    <p style="margin-left:10px;color:#636363">
                        $${sum(checkout.checkoutOrders, 'price')}
                    </p>
                    </div>
                </div>
                <div style="display:flex">
                    <div style="width:70%;border:2px solid #E5E5E5;">
                    <p style="margin-left:10px;font-weight:bold;color:#636363">
                        Shipping:
                    </p>
                    </div>
                    <div style="width:30%;border:2px solid #E5E5E5;">
                    <p style="margin-left:10px;color:#636363">
                        Free Shipping
                    </p>
                    </div>
                </div>
                <div style="display:flex">
                    <div style="width:70%;border:2px solid #E5E5E5;">
                    <p style="margin-left:10px;font-weight:bold;color:#636363">
                        Payment Method:
                    </p>
                    </div>
                    <div style="width:30%;border:2px solid #E5E5E5;">
                    <p style="margin-left:10px;color:#636363">
                        Account Funds
                    </p>
                    </div>
                </div>
                <div style="display:flex">
                    <div style="width:70%;border:2px solid #E5E5E5;">
                    <p style="margin-left:10px;font-weight:bold;color:#636363">
                        Total:
                    </p>
                    </div>
                    <div style="width:30%;border:2px solid #E5E5E5;">
                    <p style="margin-left:10px;color:#636363">
                        $${sum(checkout.checkoutOrders, 'price')}
                    </p>
                    </div>
                </div>
                </div>
            </div>
            <div style="margin-top:20px;text-align:center">
                <img src="https://www.taakad.com/images/common/logo.png" width="100" style="margin:auto" />
            </div>
            </div>
        </div>`
}

const completeOrder = (checkout, order, orderData) => {
	const todayDate = new Date()
	const months = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	]

	const arrangeData = () => {
		let resultData = ''

		for (var key of Object.keys(orderData.data)) {
			if (key !== 'thumbnail' && key !== 'image') {
				resultData += `
                <div style="display:flex;margin:0">
                <p style="font-weight:bold;min-width:40%;max-width:40%;margin:6px 0">
                    ${key.charAt(0).toUpperCase() + key.slice(1)}
                </p>
                <p style="color:#636A7C;margin:6px 0">
                    ${orderData.data[key]}
                </p>
                </div>
                `
			}
		}

		return resultData
	}

	return `
        <div style="width:500px;text-align:center;margin:auto">
            <img src="https://www.taakad.com/images/common/logo.png" width="140" style="margin:auto" />
        </div>
        <div style="width:500px;border-radius:5px;overflow:hidden;margin:auto;border: 1px solid #dedede;font-family: sans-serif">
            <div style="padding:1rem;background-color:#003056;color:#fff">
            <p style="text-align:center;font-size:26px">
                Thanks for your order!
            </p>
            </div>
            <div style="padding:1rem 2rem">
            <div style="color:#1f1f1f;border-bottom:1px solid #dedede">
                <p style="font-size:16px">
                Hi ${
									checkout.customerInfo.firstname.charAt(0).toUpperCase() + checkout.customerInfo.firstname.slice(1)
								},
                </p>
                <p style="font-size:16px;margin-left:8px">
                We have finished processing your order.
                </p>
            </div>
            <div style="color:#231F20;text-align:center">
                <p style="font-family: sans-serif;font-size:20px">
                ${order.model} All In One Information
                </p>
                ${orderData.data.thumbnail && `<img src="${orderData.data.thumbnail}" width="160" />`}       
            </div>
            <div style="margin-top:1rem;border-bottom:1px solid #dedede;padding-bottom:10px">
                                ${arrangeData()}
            </div>
            <div style="margin-top:2rem">
                <p style="font-size:18px;font-weight:bold">
                Order #${orderData.orderId} - ${`${
		months[todayDate.getMonth()]
	} ${todayDate.getDate()}, ${todayDate.getFullYear()}`}
                </p>
                <div>
                <div style="display:flex">
                    <div style="width:40%;border:2px solid #E5E5E5;">
                <p style="margin-left:10px;font-weight:bold;color:#636363">
                    Product
                </p>
                </div>
                <div style="width:30%;border:2px solid #E5E5E5;">
                <p style="margin-left:10px;font-weight:bold;color:#636363">
                    Quantity
                </p>
                </div>
                <div style="width:30%;border:2px solid #E5E5E5;">
                <p style="margin-left:10px;font-weight:bold;color:#636363">
                    Price
                </p>
                </div>
            </div>
            <div style="display:flex">
            ${checkout.checkoutOrders.map(
							(node, index) =>
								`<div style="width:40%;border:2px solid #E5E5E5;">
                                <p style="margin-left:10px;color:#636363">
                                    ${node.model} All in One Information
                                </p>
                                </div>
                                <div style="width:30%;border:2px solid #E5E5E5;">
                                <p style="margin-left:10px;color:#636363">
                                    1
                                </p>
                                </div>
                                <div style="width:30%;border:2px solid #E5E5E5;">
                                <p style="margin-left:10px;color:#636363">
                                    $${node.price}
                                </p>
                                </div>`,
						)}
            </div>
            <div style="display:flex">
                <div style="width:70%;border:2px solid #E5E5E5;">
                <p style="margin-left:10px;font-weight:bold;color:#636363">
                    Subtotal:
                </p>
                </div>
                <div style="width:30%;border:2px solid #E5E5E5;">
                <p style="margin-left:10px;color:#636363">
                    $${sum(checkout.checkoutOrders, 'price')}
                </p>
                </div>
            </div>
            <div style="display:flex">
                <div style="width:70%;border:2px solid #E5E5E5;">
                <p style="margin-left:10px;font-weight:bold;color:#636363">
                    Shipping:
                </p>
                </div>
                <div style="width:30%;border:2px solid #E5E5E5;">
                <p style="margin-left:10px;color:#636363">
                    Free Shipping
                </p>
                </div>
            </div>
            <div style="display:flex">
                <div style="width:70%;border:2px solid #E5E5E5;">
                <p style="margin-left:10px;font-weight:bold;color:#636363">
                    Payment Method:
                </p>
                </div>
                <div style="width:30%;border:2px solid #E5E5E5;">
                <p style="margin-left:10px;color:#636363">
                    Account Funds
                </p>
                </div>
            </div>
            <div style="display:flex">
                <div style="width:70%;border:2px solid #E5E5E5;">
                <p style="margin-left:10px;font-weight:bold;color:#636363">
                    Total:
                </p>
                </div>
                <div style="width:30%;border:2px solid #E5E5E5;">
                <p style="margin-left:10px;color:#636363">
                    $${sum(checkout.checkoutOrders, 'price')}
                </p>
                </div>
            </div>
            </div>
        </div>
        <div style="margin-top:20px;text-align:center">
            <img src="https://www.taakad.com/images/common/logo.png" width="100" style="margin:auto" />
        </div>
        </div>
    </div>
    `
}

export { processingOrder, completeOrder }
