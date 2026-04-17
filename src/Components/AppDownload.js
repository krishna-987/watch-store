import "./AppDownload.css";

function AppDownload() {
  return (
    <div className="app-page">

      {/* HEADER */}
      <div className="app-header">
        <h2>DOWNLOAD THE APP</h2>
        <p className="breadcrumb">Home / Download the App</p>
      </div>

      {/* CONTENT */}
      <div className="app-content">

        {/* FEATURES */}
        <ul>
          <li>✔ Authenticate & register your product</li>
          <li>✔ 1 Year extended warranty</li>
          <li>✔ Get exclusive offers</li>
          <li>✔ Stay tuned</li>
        </ul>

        <h3>JOIN THE COMMUNITY!</h3>

        {/* STORE BUTTONS */}
        <div className="store-buttons">

          {/* APP STORE */}
          <a
            href="https://www.apple.com/app-store/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/images/appstore.avif" alt="App Store" />
          </a>

          {/* GOOGLE PLAY */}
          <a
            href="https://play.google.com/store"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/images/playstore.webp" alt="Google Play" />
          </a>

        </div>

        {/* BRAND ICONS */}
        <div className="brands">
          <img src="/images/android.webp" alt="Android" />
          <img src="/images/mi.avif" alt="MI" />
          <img src="/images/oppo.avif" alt="Oppo" />
        </div>

      </div>

    </div>
  );
}

export default AppDownload;