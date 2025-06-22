# Animonad

**Animonad** is a real-time Monad blockchain analytics dashboard. It displays live transactions per second (TPS) across different DApp categories: **NFTs**, **Gaming**, **Social**, and **DeFi**.

**Link**: [animonad.vercel.app](https://animonad.vercel.app)

---

### 🚀 Backend 

* **Platform**: Deployed on **AWS EC2** accessible via [samkdev.xyz/api/data](https://samkdev.xyz/api/data).
* **Proxy + SSL**: Secured via **NGINX** reverse proxy and **Let's Encrypt SSL**.
* **Data Source**: Queries Envio [HyperSync](https://monad-testnet.hypersync.xyz) every 1 second.
* **Data Handling**:
  * Fetches the latest 2 blocks.
  * Filters only successful transactions.
  * Extracts and counts DApp categories based on:
    * `to`/`from` contract matches using [protocols.csv](https://github.com/monad-developers/protocols/blob/main/protocols.csv)
    * Function signatures (`input.slice(0, 10)`) from [function signatures sheet](https://docs.google.com/spreadsheets/d/11vji0UhVjwzCRdvb8TXzBo5jSl0X_i-p0xP5rRgjui4/edit#gid=45694431)
    * Kizzy deposits tracked using specific `log.address`
* **Endpoints**:
  * `GET /api/data` - Returns block metrics, categorized TX counts, and recent TX list.

### 🔄 Frontend

* **Framework**: Built with **Next.js**
* **Realtime Fetch**: Pulls fresh data from `/api/data` every second.
* **Visuals**:
  * Dynamic bar chart for DApp category TPS.
  * Realtime block stats: block number, gas used, total volume, TPS.
  * Leaderboard for most active DApps.
  * List of latest transactions.

---

### 📦 Installation Steps

#### 1. Clone the repository

```bash
git clone https://github.com/Sam-ruk/animonad.git
cd animonad
```

#### 2. Backend Setup

```bash
cd backend_aws
npm install @envio-dev/hypersync-client
node hypersync.js  # Runs on localhost:3000 by default
```

#### 3. Frontend Setup

```bash
npm install

# Add .env.local file
echo "NEXT_PUBLIC_API_URL=https://localhost:3000" > .env.local

npm run dev
```

---

## 🚀 Future Plans

* More dapps and protocols to be added.
* Support for different ERC20 tokens while viewing the latest TXs.

---
