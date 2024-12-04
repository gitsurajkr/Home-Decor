import { Link } from 'react-router-dom'
import { Minus, Plus, Trash2, RefreshCw, Heart, CreditCard, CreditCardIcon, Apple } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { toast } from "react-hot-toast"
import Header from "@/components/Header"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import decor3 from "../assets/decor/decor3.jpg"
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addItemToCart, applyCoupon, moveToCart, moveToWishList, removeItemFromCart, setPaymentMethod, setShippingMethod, updateItemQuantity } from '@/redux/cartSlice'

const shippingOptions = [
    { id: 'standard', name: 'Standard Shipping', price: 5.99 },
    { id: 'express', name: 'Express Shipping', price: 14.99 },
]

export default function EnhancedCartPage() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const cartItems = useSelector(state => state.cart.cartItems)
    const wishlistItems = useSelector(state => state.cart.wishListItems)
    const appliedCoupon = useSelector(state => state.cart.appliedCoupon)
    const shippingMethod = useSelector(state => state.cart.shippingMethod)
    const paymentMethod = useSelector(state => state.cart.paymentMethod)
    const couponCode = useSelector(state => state.cart.couponCode)

    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const discount = appliedCoupon ? subtotal * 0.1 : 0 
    const shippingCost = shippingOptions.find(option => option.id === shippingMethod)?.price || 0
    const tax = (subtotal - discount) * 0.1 
    const total = subtotal - discount + tax + shippingCost

    return (
        <div className="min-h-screen bg-silver  ">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                <Header />
                <div className="flex items-center space-x-4 pt-4">
                    <Sheet>
                        <SheetContent>
                            <SheetHeader>
                                <SheetTitle>Your Cart</SheetTitle>
                                <SheetDescription>
                                    {cartItems.length === 0 ? (
                                        <p>Your cart is empty</p>
                                    ) : (
                                        <div className="space-y-4">
                                            {cartItems.map((item) => (
                                                <div key={item.id} className="flex items-center space-x-4">
                                                    <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                                                    <div>
                                                        <p className="font-medium">{item.name}</p>
                                                        <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                                                    </div>
                                                    <p className="ml-auto">${(item.price * item.quantity).toFixed(2)}</p>
                                                </div>
                                            ))}
                                            <div className="flex justify-between font-bold">
                                                <span>Total:</span>
                                                <span>${total.toFixed(2)}</span>
                                            </div>
                                            <Button className="w-full" asChild>
                                                <Link href="/cart">View Full Cart</Link>
                                            </Button>
                                        </div>
                                    )}
                                </SheetDescription>
                            </SheetHeader>
                        </SheetContent>
                    </Sheet>

                </div>
            </div>


            <main className="container mx-auto px-4 py-12">
                {cartItems.length === 0 && wishlistItems.length === 0 ? (
                    <div className="text-center">
                        <p className="text-xl mb-4">Your cart and wishlist are empty</p>
                        <Button onClick = {() => navigate("/product-page")}>
                            Continue Shopping
                        </Button>
                    </div>
                ) : (
                    <div className="grid gap-8 md:grid-cols-3">
                        <div className="md:col-span-2">
                            <Tabs defaultValue="cart">
                                <TabsList className="grid w-full grid-cols-2">
                                    {/* Improve colour */}
                                    <TabsTrigger value="cart" >Cart ({cartItems.length})</TabsTrigger>
                                    <TabsTrigger value="wishlist" >Wishlist ({wishlistItems.length})</TabsTrigger>
                                </TabsList>
                                <TabsContent value="cart">
                                    <AnimatePresence>
                                        {cartItems.map((item) => (
                                            <motion.div
                                                key={item.id}
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                exit={{ opacity: 0, height: 0 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <div className="flex items-center space-x-4 py-4 border-b border-black">
                                                    <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                                                    <div className="flex-grow">
                                                        <h3 className="font-medium ">{item.name}</h3>
                                                        <p className="text-sm text-muted-foreground text-slate-600">Color: {item.color}, Size: {item.size}</p>
                                                        <div className="flex items-center space-x-2 mt-2">
                                                            <Button
                                                                className="hover:bg-black hover:text-white "
                                                                variant="outline"
                                                                size="icon"
                                                                onClick={() => dispatch(updateItemQuantity({ id: item.id, newQuantity: item.quantity - 1 }))} // Dispatch action to decrease quantity
                                                                aria-label={`Decrease quantity of ${item.name}`}
                                                            >
                                                                <Minus className="h-4 w-4" />
                                                            </Button>
                                                            <Input
                                                                min="1"
                                                                value={item.quantity}
                                                                onChange={(e) => dispatch(updateItemQuantity({ id: item.id, newQuantity: parseInt(e.target.value) }))} 
                                                                className="w-16 text-center no-spinner"
                                                                readOnly

                                                            />
                                                           
                                                            <Button
                                                                variant="outline"
                                                                size="icon"
                                                                onClick={() => dispatch(updateItemQuantity({ id: item.id, newQuantity: item.quantity + 1 }))} // Dispatch action to increase quantity
                                                                aria-label={`Increase quantity of ${item.name}`}
                                                                className="hover:bg-black hover:text-white "
                                                            >
                                                                <Plus className="h-4 w-4 " />
                                                            </Button>
                                                        </div>
                                                    </div>

                                                    <div className="text-right">
                                                        <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => dispatch(moveToWishList(item.id))} // Dispatch action to move item to wishlist
                                                            className="mt-2 bg-white hover:bg-black hover:text-silver"
                                                        >
                                                            <Heart className="h-4 w-4 mr-2 text-silver" />
                                                            Save for later
                                                        </Button>
                                                    </div>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => dispatch(removeItemFromCart(item))} // Dispatch action to remove item from cart
                                                        aria-label={`Remove ${item.name} from cart`}
                                                        className="hover:text-black "
                                                    >
                                                        <Trash2 className="h-4 w-4 " />
                                                    </Button>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                </TabsContent>
                                <TabsContent value="wishlist">
                                    <AnimatePresence>
                                        {wishlistItems.map((item) => (
                                            <motion.div
                                                key={item.id}
                                                initial={{ opacity: 0, height: 0 }}
                                                animate={{ opacity: 1, height: 'auto' }}
                                                exit={{ opacity: 0, height: 0 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <div className="flex items-center space-x-4 py-4 border-b">
                                                    <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                                                    <div className="flex-grow">
                                                        <h3 className="font-medium text-slate-900">{item.name}</h3>
                                                        <p className="text-sm text-muted-foreground text-slate-800">Color: {item.color}, Size: {item.size}</p>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="font-medium text-slate-800">${item.price.toFixed(2)}</p>
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() => dispatch(moveToCart(item.id))}
                                                            className="mt-2 hover:bg-black hover:text-white"
                                                        >
                                                            Move to Cart
                                                        </Button>
                                                    </div>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => dispatch(moveToCart(prev => prev.filter(i => i.id !== item.id)))}
                                                        aria-label={`Remove ${item.name} from wishlist`}
                                                        className="hover:text-white hover:bg-black bg-white"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </AnimatePresence>
                                </TabsContent>
                            </Tabs>

                            <div className="mt-4 flex justify-between items-center">
                                <Button variant="outline" asChild className="hover:bg-black hover:text-white">
                                    <Link href="/product-page">
                                        <RefreshCw className="mr-2 h-4 w-4" />
                                        Continue Shopping
                                    </Link>
                                </Button>
                                <div className="flex items-center space-x-2">
                                    <Input
                                        type="text"
                                        placeholder="Enter coupon code"
                                        value={couponCode}
                                        onChange={() => dispatch(couponCode(item.id))}
                                        className="w-40 "
                                    />
                                    <Button  onClick={applyCoupon}>Apply Coupon</Button>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6 ">
                            <div className="bg-card rounded-lg shadow p-6 ">
                                <h2 className="text-lg font-bold mb-4 ">Order Summary</h2>
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <span >Subtotal</span>
                                        <span >${subtotal.toFixed(2)}</span>
                                    </div>
                                    {appliedCoupon && (
                                        <div className="flex justify-between text-green-700">
                                            <span>Discount (10%)</span>
                                            <span>-${discount.toFixed(2)}</span>
                                        </div>
                                    )}
                                    <div className="flex justify-between ">
                                        <span >Shipping</span>
                                        <span >${shippingCost.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span >Tax</span>
                                        <span >${tax.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-lg font-bold">
                                        <span className='text-slate-800'>Total</span>
                                        <span className='text-slate-800'>${total.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-card rounded-lg shadow p-6 ">
                                <h2 className="text-lg font-bold mb-4 ">Shipping Method</h2>
                                <RadioGroup  value={shippingMethod} onValueChange={(value)=>dispatch(setShippingMethod(value))}>
                                    {shippingOptions.map((option) => (
                                        <div key={option.id} className="flex items-center space-x-2">
                                            <RadioGroupItem value={option.id} id={option.id}  />
                                            <Label htmlFor={option.id}>{option.name} - ${option.price.toFixed(2)}</Label>
                                        </div>
                                    ))}
                                </RadioGroup>
                            </div>
                            <div className="bg-card rounded-lg shadow p-6 ">
                                <h2 className="text-lg font-bold mb-4 ">Payment Method</h2>
                                <RadioGroup  value={paymentMethod} onValueChange={(value) => dispatch(setPaymentMethod(value))}>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="card" id="card"  />
                                        <Label htmlFor="card" className="flex items-center">
                                            <CreditCard className="mr-2 h-4 w-4" />
                                            Credit Card
                                        </Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="paypal" id="paypal"  />
                                        <Label htmlFor="paypal" className="flex items-center">
                                            <CreditCardIcon className="mr-2 h-4 w-4" />
                                            PayPal
                                        </Label>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <RadioGroupItem value="apple" id="apple"  />
                                        <Label htmlFor="apple" className="flex items-center">
                                            <Apple className="mr-2 h-4 w-4" />
                                            Apple Pay
                                        </Label>
                                    </div>
                                </RadioGroup>
                            </div>

                            <Button className="w-full">Proceed to Checkout</Button>
                        </div>
                    </div>
                )}
            </main>
        </div>
    )
}