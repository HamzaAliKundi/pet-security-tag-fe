# Pet Security Tag Public Frontend - Complete Flow Documentation

## 🏗️ Application Architecture

This is a **React + JavaScript Public Marketing Website** built with:
- **Frontend Framework**: React 19 with JavaScript
- **State Management**: Redux Toolkit (RTK Query)
- **Routing**: React Router DOM v6
- **Styling**: Tailwind CSS
- **Payment Processing**: Stripe (React Stripe.js)
- **Build Tool**: Vite
- **UI Libraries**: Framer Motion, Lucide React, React Icons
- **Date Libraries**: date-fns, moment, react-big-calendar
- **Localization**: IP-based geolocation for pricing

---

## 📁 Project Structure

```
src/
├── apis/                    # API layer (RTK Query)
│   ├── contact/            # Contact form API
│   ├── orders/             # Order management API
│   ├── petProfile/         # Pet profile & QR scanning API
│   └── venues/             # Venues API (if applicable)
├── components/             # UI components
│   ├── auth/               # Authentication components
│   │   ├── login.jsx
│   │   └── signup.jsx
│   ├── blog/               # Blog components
│   ├── blog-detail/        # Blog detail components
│   ├── common/             # Shared components
│   │   ├── customer.jsx
│   │   ├── faqs.jsx
│   │   ├── getStarted.jsx
│   │   ├── order.jsx
│   │   ├── search.jsx
│   │   └── servicesInfo.jsx
│   ├── contact/            # Contact form components
│   ├── faqs/               # FAQ components
│   ├── footer.jsx          # Footer component
│   ├── get-info/           # Get info component
│   ├── home/               # Home page components
│   │   ├── digital.jsx
│   │   ├── getMoreOnfo.jsx
│   │   ├── hero.jsx
│   │   ├── message.jsx
│   │   ├── pricing.jsx
│   │   └── services.jsx
│   ├── navbar.jsx          # Navigation bar
│   ├── order/              # Order components
│   │   └── order.jsx
│   ├── pricing/            # Pricing components
│   ├── profile/            # Pet profile components
│   │   ├── profile.jsx
│   │   └── LocationShareModal.jsx
│   ├── qr/                 # QR code components
│   │   └── qrScanner.jsx
│   └── tag/                # Tag information components
│       ├── banner.jsx
│       ├── gps.jsx
│       └── smatTag.jsx
├── context/                # React Context
│   └── LocalizationContext.jsx # IP-based pricing localization
├── pages/                  # Page components (route handlers)
│   ├── Home/               # Landing page
│   ├── blog/               # Blog listing
│   ├── blog-detail/        # Blog detail page
│   ├── contact/            # Contact page
│   ├── faqs/               # FAQ page
│   ├── order/              # Order page
│   ├── pricing/            # Pricing page
│   ├── profile/            # Pet profile page
│   └── tag/                # Tag information page
├── store.jsx               # Redux store configuration
├── App.jsx                 # Main app component with routing
├── main.jsx                # Application entry point
└── index.css               # Global styles
```

---

## 🔄 Complete Application Flow

### 1. **Application Initialization** (`main.jsx`)

**Flow:**
```
index.html → main.jsx → App.jsx
```

1. **Entry Point** (`index.html`):
   - Loads React app into `#root` div
   - Imports `main.jsx` as module
   - Loads fonts: Space Grotesk, Tangerine

2. **Main Setup** (`main.jsx`):
   ```jsx
   - Wraps app in <StrictMode>
   - Provides Redux Store (<Provider store={store}>)
   - Provides Localization Context (<LocalizationProvider>)
   - Renders <App /> component
   ```

3. **State Management Setup** (`store.jsx`):
   - Configures Redux store with RTK Query APIs:
     - `venuesApi` - Venues (if applicable)
     - `ordersApi` - Order management
     - `contactApi` - Contact form submissions
     - `petProfileApi` - Pet profiles & QR scanning
   - All APIs configured with middleware for caching

---

### 2. **Routing & Navigation** (`App.jsx`)

**Route Structure:**
```
/Public Routes (All accessible)
  ├── / → HomePage (Landing page)
  ├── /contact → ContactUsPage
  ├── /faqs → FaqsPage
  ├── /pet-tag → PetTagPage
  ├── /blog → BlogPage
  ├── /blog-detail/:id → BlogDetail
  ├── /order → OrderPage
  ├── /qr/:code → QRScanner (QR code scanning)
  ├── /profile/:id → ProfilePage (Pet profile)
  ├── /get-info → GetInfo
  ├── /about-us → AboutUs
  ├── /pricing → PricingPage
  ├── /privacy-policy → PrivacyPolicy
  ├── /terms-conditions → TermsConditions
  ├── /cookie-policy → CookiePolicy
  ├── /refund-cancellation-policy → RefundCancellationPolicy
  ├── /shipping-policy → ShippingPolicy
  ├── /sms-consent-statement → SMSConsentStatement
  ├── /login → Login (redirects to dashboard)
  └── /signup → Signup (redirects to dashboard)

Navbar: Hidden on /login and /signup
Footer: Hidden on /login and /signup
```

**Navigation Flow:**
- Navbar shown on all routes except `/login` and `/signup`
- Footer shown on all routes except `/login` and `/signup`
- Login/Signup redirect to external dashboard URL (`VITE_DASHBOARD_URL`)

---

### 3. **Localization & Pricing** (`context/LocalizationContext.jsx`)

**IP-Based Geolocation:**
```
1. On app load, detect user's country via IP (ipapi.co)
2. Set pricing based on country:
   - US: USD pricing
   - CA: CAD pricing
   - Default: GBP pricing (for UK and European countries)
3. Provide context with:
   - Shipping prices
   - Tag prices
   - Subscription prices (monthly/yearly/lifetime)
```

**Pricing Structure:**
- **Tag Prices:**
  - US: $3.99 USD
  - CA: $5.59 CAD
  - Default (GBP): £2.99

- **Shipping Prices:**
  - US: $9.19 USD
  - CA: $15.09 CAD
  - European countries (GB, DE, FR, IT, etc.): £2.90
  - Default: £2.90

- **Subscription Prices:**
  - **US:**
    - Monthly: $3.69
    - Yearly: $37.99
    - Lifetime: $169.99
  - **CA:**
    - Monthly: $5.11 CAD
    - Yearly: $53.99 CAD
    - Lifetime: $239.99 CAD
  - **Default (GBP):**
    - Monthly: £2.75
    - Yearly: £28.99
    - Lifetime: £129.99

**Currency Display:**
- Automatically detects and displays in user's local currency
- Shows currency symbol and code
- Updates pricing throughout the app

---

### 4. **Home Page** (`pages/Home/index.tsx`)

**Components Displayed (in order):**
1. **Hero** (`components/home/hero.jsx`):
   - Main headline: "The Fastest Way To Find Your Pet"
   - Call-to-action buttons:
     - "FREE TAG, JUST PAY SHIPPING [price]"
     - "ORDER YOUR TAG TODAY!"
   - Hero image (dog with tag)
   - Customer reviews badge

2. **Message** (`components/home/message.jsx`):
   - Key messaging about the product

3. **Digital** (`components/home/digital.jsx`):
   - Digital features and benefits

4. **Services** (`components/home/services.jsx`):
   - Services offered

5. **ServicesInfo** (`components/common/servicesInfo.jsx`):
   - Additional service information

6. **Customers** (`components/common/customer.jsx`):
   - Customer testimonials/reviews

7. **GetStarted** (`components/common/getStarted.jsx`):
   - Getting started section

8. **Order** (`components/common/order.jsx`):
   - Order section/CTA

9. **Faqs** (`components/common/faqs.jsx`):
   - Frequently asked questions

**Note:** Pricing and GetMoreInfo components are commented out

---

### 5. **Navbar** (`components/navbar.jsx`)

**Features:**
- Logo with link to home
- "GET YOUR PET TAG" button (links to `/order`)
- Navigation links:
  - HOME
  - FAQS
  - PET TAG
  - CONTACT US
  - BLOG (commented out)
- "LOGIN NOW" button (redirects to dashboard URL)
- Mobile hamburger menu
- Active route highlighting

**Mobile Menu:**
- Dropdown menu with all links
- Opens/closes on hamburger click
- Full navigation accessible on mobile

---

### 6. **Order Flow** (`pages/order/index.jsx`)

**Page Components:**
1. **Order** (`components/order/order.jsx`) - Main order form
2. **Customers** - Testimonials
3. **GetStarted** - Getting started info
4. **Search** - Search component
5. **Faqs** - FAQ section

#### **Order Component** (`components/order/order.jsx`)

**Complete Order Flow:**
```
1. User fills order form:
   - Email, Name
   - Pet Name
   - Quantity (1-5 tags)
   - Tag Color(s) - one per tag if quantity > 1
   - Subscription Type (monthly/yearly)
   - Phone number with country code selector
   - Shipping address:
     - Street, City, State
     - Zip Code, Country

2. QR Availability Check:
   - API Call: GET /api/v1/qr/check-availability
   - Checks if QR codes are available
   - Disables order form if unavailable

3. Price Calculation:
   - Tag price: Based on user's country (from LocalizationContext)
   - Shipping: Based on country
   - Subscription: Based on selected plan and country
   - Total: Calculated dynamically

4. Terms Acceptance:
   - User must accept terms and conditions
   - Required before payment

5. Stripe Payment Setup:
   - Initialize Stripe: loadStripe(VITE_STRIPE_PUBLISH_KEY)
   - Create order via backend
   - API Call: POST /api/v1/user/orders
     Body: {
       email, name, petName, quantity,
       subscriptionType, tagColor/tagColors,
       phone, shippingAddress
     }
   - Returns: { order, payment: { clientSecret, paymentIntentId } }

6. Payment Processing:
   - User enters card details (Stripe Elements)
   - Create payment method: stripe.createPaymentMethod()
   - Confirm payment: stripe.confirmCardPayment(clientSecret)
   - Backend confirms: POST /api/v1/user/orders/:orderId/confirm-payment
     Body: { paymentIntentId }

7. Order Completion:
   - Success message displayed
   - Redirect to success page or dashboard
```

**Features:**
- Quantity selector (1-5)
- Color selector for each tag (if quantity > 1)
- Subscription plan selection (monthly/yearly)
- Country code selector for phone
- Real-time price calculation
- Responsive design
- Mobile-friendly color preview
- Terms acceptance checkbox
- QR availability check

**Currency Handling:**
- Prices displayed in user's local currency
- Backend receives EUR (converted internally)
- Currency symbols displayed correctly

---

### 7. **QR Code Scanning Flow** (`pages/qr/:code`)

#### **QR Scanner Component** (`components/qr/qrScanner.jsx`)

**Flow:**
```
1. User scans QR code → Navigate to /qr/:code
   (Public route - accessible to anyone)

2. Scan QR Code:
   - API Call: GET /api/v1/qr/scan/:code
   - Returns QR code details and status

3. Routing Logic:
   a) If QR is verified with active subscription:
      → Redirect to /profile/:petId (show pet profile)

   b) If QR needs verification:
      → Redirect to user dashboard verification page
      → URL: ${VITE_DASHBOARD_URL}/qr/verify/:code

   c) If subscription expired:
      → Show expiration message
      → Display options:
         - Go to Home
         - Owner Login (links to dashboard)

   d) If invalid QR code:
      → Show error message
      → Option to go home
```

**Loading States:**
- Shows spinner while processing
- Animated loading message

**Error Handling:**
- Subscription expired: Special UI with helpful message
- Invalid QR: Error message with home button
- Network errors: Error display

---

### 8. **Pet Profile Page** (`pages/profile/:id`)

#### **Profile Component** (`components/profile/profile.jsx`)

**Flow:**
```
1. User lands on /profile/:id (from QR scan)

2. Fetch Pet Profile:
   - API Call: GET /api/v1/qr/pet-profile/:id
   - Returns: Pet information, owner details, QR code status

3. Display Pet Information:
   - Pet name (if not hidden)
   - Pet image
   - Owner contact information
   - Medical information (if provided)
   - QR code status

4. Actions Available:
   - Share Location (GPS)
   - Call Owner (if phone number available)
   - WhatsApp Owner
   - Share Location via SMS
```

**Location Sharing:**
```
1. User clicks "Share Location"
2. Browser requests GPS permission
3. Get current location: navigator.geolocation.getCurrentPosition()
4. Send location to backend:
   - API Call: POST /api/v1/qr/share-location
   - Body: {
       petId, method, latitude, longitude,
       locationUrl, petName
     }
5. Backend:
   - Gets owner's phone number
   - Sends SMS/WhatsApp with location
   - Notifies pet owner
6. Success message displayed
```

**WhatsApp Integration:**
- Gets GPS location
- Retrieves owner's phone from backend
- Opens WhatsApp with pre-filled message
- Includes Google Maps link

**SMS Integration:**
- Similar to WhatsApp
- Opens SMS app with pre-filled message
- Includes location link

---

### 9. **Contact Page** (`pages/contact`)

**Contact Form:**
- Full name
- Email
- Purpose/Subject
- Message
- Submit button

**API Integration:**
- API Call: POST /api/v1/user/contact
- Body: { fullName, email, purpose, message }
- Success message displayed

---

### 10. **FAQ Page** (`pages/faqs`)

**Sections:**
- General FAQs
- Delivery FAQs
- Replacement FAQs
- Subscription FAQs

**Components:**
- Banner
- FAQ sections with expandable answers
- Common questions and answers

---

### 11. **Pet Tag Information Page** (`pages/tag`)

**Components:**
- Banner
- Smart Tag information
- GPS features
- Tag benefits

**Content:**
- Explains how the pet tag works
- Features and benefits
- How QR codes work
- Subscription information

---

### 12. **Pricing Page** (`pages/pricing`)

**Features:**
- Subscription plan comparison
- Monthly/Yearly/Lifetime options
- Pricing based on user's country
- Currency display
- Call-to-action buttons

**Component:**
- `PricingPlans.jsx` - Plan comparison table

---

### 13. **Blog Pages**

**Blog Listing** (`pages/blog`):
- List of blog posts
- Blog cards with previews
- Links to blog details

**Blog Detail** (`pages/blog-detail/:id`):
- Full blog post content
- Banner
- Reading component
- More blogs section

---

### 14. **Policy Pages**

All policy pages are static content:
- Privacy Policy
- Terms & Conditions
- Cookie Policy
- Refund & Cancellation Policy
- Shipping Policy
- SMS Consent Statement

---

### 15. **API Layer Architecture**

#### **RTK Query Setup**

**Base Query Configuration:**
```javascript
fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_BASE_URL,
})
```

**API Endpoints:**

**Orders API** (`apis/orders/index.jsx`):
- `POST /user/orders` - Create order
- `GET /user/orders/:orderId` - Get order
- `PATCH /user/orders/:orderId/shipping` - Update shipping
- `PATCH /user/orders/:orderId/status` - Update status
- `POST /user/orders/:orderId/confirm-payment` - Confirm payment
- `GET /qr/check-availability` - Check QR availability

**Pet Profile API** (`apis/petProfile/index.jsx`):
- `GET /qr/pet-profile/:petId` - Get pet profile
- `GET /qr/scan/:code` - Scan QR code
- `GET /qr/verify-details/:code` - Get QR verification details

**Contact API** (`apis/contact/index.jsx`):
- `POST /user/contact` - Submit contact form

**Venues API** (`apis/venues/index.jsx`):
- Venue-related endpoints (if applicable)

**Cache Management:**
- Tag-based invalidation
- Auto-refetch on mutation
- Efficient caching strategy

---

### 16. **Stripe Integration**

#### **Stripe Setup**

**Initialization:**
```javascript
const stripePromise = loadStripe(VITE_STRIPE_PUBLISH_KEY)
```

**Payment Flow:**
```
1. Frontend creates order → Backend creates PaymentIntent
2. Backend returns: { order, payment: { clientSecret, paymentIntentId } }
3. Frontend uses Stripe Elements for card input
4. User enters card details
5. Create payment method: stripe.createPaymentMethod()
6. Confirm payment: stripe.confirmCardPayment(clientSecret)
7. On success → Confirm with backend
8. Backend verifies payment and completes order
```

**Components:**
- Uses `@stripe/react-stripe-js`
- `Elements` wrapper
- `CardElement` for card input
- `useStripe` and `useElements` hooks

---

### 17. **Authentication Links**

**Login/Signup:**
- `/login` and `/signup` routes redirect to external dashboard
- Dashboard URL from `VITE_DASHBOARD_URL` environment variable
- Default: `https://user.digitaltails.com`

**Flow:**
```
1. User clicks "LOGIN NOW"
2. Redirects to: ${VITE_DASHBOARD_URL}/login
3. User logs in on dashboard
4. Returns to public site if needed
```

---

### 18. **Error Handling & Notifications**

**Toast Notifications** (`react-hot-toast`):
- Success: `toast.success("Message")`
- Error: `toast.error("Message")`
- Configured in `App.jsx`: `<Toaster position="top-center" />`

**Error States:**
- API errors caught in try-catch blocks
- Error messages displayed via toast
- Loading states shown during API calls
- User-friendly error messages

---

### 19. **Responsive Design**

**Features:**
- Mobile-first approach
- Hamburger menu for mobile
- Responsive forms
- Touch-friendly buttons
- Adaptive layouts
- Breakpoints for tablet/desktop

---

### 20. **Complete User Journey Examples**

#### **New Customer Journey:**
```
1. User visits website → / (Home page)
2. Views hero section with pricing
3. Clicks "ORDER YOUR TAG TODAY!" → /order
4. Fills order form:
   - Enters email, name, pet name
   - Selects quantity (1-5)
   - Chooses tag color(s)
   - Selects subscription plan
   - Enters shipping address
   - Enters phone number
5. Accepts terms and conditions
6. Enters payment details (Stripe)
7. Payment processed
8. Order confirmed
9. Receives confirmation email
10. Waits for tag delivery
```

#### **QR Code Scanner Journey (Finder):**
```
1. Finder finds lost pet
2. Scans QR code on pet's tag
3. Redirected to /qr/:code
4. QR code scanned → API call
5. If verified:
   - Redirected to /profile/:petId
   - Sees pet profile with owner info
   - Can:
     - Share location via GPS
     - Call owner
     - WhatsApp owner
     - SMS owner with location
6. Owner receives notification
7. Pet reunited with owner
```

#### **QR Code Scanner Journey (Unverified):**
```
1. Finder scans QR code
2. QR not verified yet
3. Redirected to dashboard verification page
4. If owner scans their own QR:
   - Logged in → Auto-verify or upgrade
   - Not logged in → Login → Verify
5. QR verified → Subscription active
6. Future scans show pet profile
```

---

## 🔐 Security Features

1. **Payment Security:**
   - Stripe handles all payment processing
   - No card details stored on frontend
   - Payment intents verified on backend
   - PCI compliance via Stripe

2. **API Security:**
   - All API calls to backend
   - CORS configured on backend
   - No sensitive data in frontend code

3. **Location Privacy:**
   - GPS permission requested from user
   - Location only shared when user explicitly shares
   - Privacy policy clearly stated

---

## 📊 Key Features Summary

✅ **Marketing Website**
- Landing page with hero section
- Product information
- Customer testimonials
- Pricing information
- FAQ section

✅ **Order Management**
- Public order creation (no login required)
- Stripe payment integration
- Multiple tag colors support
- Quantity selection (1-5)
- Subscription plan selection
- QR availability checking

✅ **QR Code Scanning**
- Public QR code scanning
- Automatic routing based on QR status
- Pet profile display
- Location sharing features

✅ **Pet Profile Display**
- Public pet profile (when QR verified)
- Owner contact information
- Location sharing (GPS, SMS, WhatsApp)
- Call owner feature

✅ **Contact & Support**
- Contact form
- FAQ sections
- Policy pages

✅ **Localization**
- IP-based country detection
- Dynamic pricing (USD/CAD/GBP)
- Currency symbols
- Shipping costs by country

✅ **Responsive Design**
- Mobile-friendly navigation
- Adaptive layouts
- Touch-friendly UI

---

## 🔗 API Endpoints Summary

**Base URL**: `VITE_API_BASE_URL` (from environment variables)

### Orders
- `POST /user/orders` - Create order (public)
- `GET /user/orders/:orderId` - Get order
- `PATCH /user/orders/:orderId/shipping` - Update shipping
- `PATCH /user/orders/:orderId/status` - Update status
- `POST /user/orders/:orderId/confirm-payment` - Confirm payment

### QR Codes
- `GET /qr/scan/:code` - Scan QR code (public)
- `GET /qr/verify-details/:code` - Get QR verification details
- `GET /qr/pet-profile/:petId` - Get pet profile (public)
- `POST /qr/share-location` - Share location with owner (public)
- `GET /qr/check-availability` - Check QR code availability

### Contact
- `POST /user/contact` - Submit contact form (public)

---

## 🎨 UI/UX Features

- **Design System**: Tailwind CSS with custom color scheme
- **Primary Color**: `#4CB2E2` (Cyan blue)
- **Accent Color**: `#FDD30F` (Yellow)
- **Fonts**: Space Grotesk (main), Tangerine (accent)
- **Icons**: React Icons + Lucide React
- **Animations**: Framer Motion
- **Toast Notifications**: React Hot Toast

---

## 🔄 Integration with Other Applications

**Dashboard Integration:**
- Login/Signup redirect to: `VITE_DASHBOARD_URL`
- QR verification redirect to dashboard
- Seamless user experience

**Backend Integration:**
- All API calls to backend
- Shared data models
- Consistent authentication (for dashboard redirects)

---

## 📝 Environment Variables

**Required:**
```env
VITE_API_BASE_URL=https://api.digitaltails.com/api/v1
VITE_DASHBOARD_URL=https://user.digitaltails.com
VITE_STRIPE_PUBLISH_KEY=pk_...
```

---

This completes the comprehensive flow documentation of the Pet Security Tag Public Frontend application.
