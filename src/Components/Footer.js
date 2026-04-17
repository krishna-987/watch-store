import "./Footer.css";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

function Footer() {
  return (
    <footer className="footer">

      {/* TOP */}
      <div className="footer-top">

        {/* COLUMN 1 */}
        <div className="footer-col">
          <h4>KNOW US</h4>
          <Link to="/">About Us</Link>
          <Link to="/">Corporate Gifting</Link>
          <Link to="/">Stores</Link>
        </div>

        {/* COLUMN 2 */}
        <div className="footer-col">
          <h4>TERMS & CONDITIONS</h4>
          <Link to="/">Privacy Policy</Link>
          <Link to="/">T&C and FAQs</Link>
        </div>

        {/* COLUMN 3 */}
        <div className="footer-col">
          <h4>CONTACT US</h4>
          <p>Email: support@watchstore.com</p>
          <p>Phone: +91 9876543210</p>
          <p>Mon–Sat: 9:00 AM – 5:30 PM</p>
        </div>

        {/* COLUMN 4 */}
        <div className="footer-col">
          <h4>FOLLOW US</h4>
          <div className="social-icons">
            <FaFacebookF />
            <FaInstagram />
            <FaTwitter />
          </div>
        </div>

      </div>

      {/* LONG TEXT SECTION */}
      <div className="footer-middle">
        <p>
          Watches in Mumbai: Bandra, Andheri, Dadar, Kurla, Navi Mumbai |
          Watches in Delhi: Connaught Place, Karol Bagh |
          Watches in Bangalore: MG Road, Whitefield |
          Watches in Kochi: Lulu Mall |
          Watches in Chennai: T Nagar, Anna Nagar |
          Watches in Hyderabad: Jubilee Hills |
          Watches in Pune: Phoenix Mall |
          Watches in Kolkata: Park Street |
          Watches in Ahmedabad: CG Road |
          Watches in Jaipur: MI Road |
          Watches in Lucknow: Hazratganj |
          Watches in Chandigarh: Sector 17
          Watches in Mumbai: Bandra, Oberoi Mall, R City Mall, Lower Parel, Fort Mumbai, Ghatkopar, Kurla(W), Shivaji Airport, Khar LinkingRoad, Vashi Sector 17, Kalyan-Murbad Rd, L.T Road, Mumbai Airport T1B, Malad, Veer Nariman Road, Chembur-East, Andheri West,, Dadar West . Watches in Dehradun: Rajpur Road, jakhan . Watches in Lucknow: Hazratganj, Phoenix Mall, fun mall, Phoenix United, Ansal API, Gol Market . Watches in Sri Ganganagar: Sri Ganganagar . Watches in Hyderabad: Jubilee Hills, Capital Mall, Somajiguda, Himayat Nagar, Trade Centre, Kamala Nagar, MADHAPUR, Banjara Hills . Watches in Noida: Sector 18, GIP Mall, Mall of India . Watches in Indore: Rasoma Square, Scheme 140, Near Starbucks Cafe . Watches in Chennai: Pondy Bazaar, OMR, Anna Nagar, Velachery, Vr Mall, Cathedral Road, Express Avenue, Gandhi Nagar, Phoenix Mkt City, Ashok Nagar, Bondy Bazzar,Chennai . Watches in Jaipur: Divya Mall, Malviya Nagar, M I Road, Hanuman Nagar . Watches in Ahmedabad: Alphaone, Maninagar, CG Road, 4D Square Mall, TRP Mall, Palladium Mall . Watches in Raipur: Jaistambh Chowk, Ambuja Mall . Watches in Bengaluru: Nexus Seawood's Mall, Phoenix Mall, E City, Kammanahalli, Marathahalli, Sarjapura, Koramangala, Indiranagar, Bel Road, MG Road, Jayanagar, Banashankari, Hsr Layout, Commercial St., Global Mall, Malleshwaram, Bannerghatta Rd, K R Puram, vijayanagar, Basavanagudi, RT Nagar . Watches in Gurugram: Sapphire Mall, Ambience Mall, Mgf Gurgaon . Watches in Pune: Paud Road, Phoenix Mall, Westend Mall, Satara Road, Phoenix Wakad, The Ark, NIBM Road . Watches in Varanasi: Kuber Complex, Durgakund, Maqbool AlamRoad . Watches in Gwalior: Db City Mall . Watches in Chandigarh: Sector-17E, Elante Mall . Watches in Ludhiana: Sarabha Nagar, Ghumar Mandi . Watches in New Delhi: Connaught Place, Rajouri Garden, Vegas Mall, Lajpat Nagar, Pacific Mall, Ambience Mall, Karolbagh, South Extension, Pitampura . Watches in Amritsar: Amritsar, MALL OF AMRITSAR . Watches in Kochi: Lulu Mall, Shunmugham Road . Watches in Trivandrum: Kowdiar, Lulu Mall . Watches in Thane: Thane (W), Viviana Mall, Gladys Alwares road . Watches in Kolkata: Park Street, Rajarhat, Mani Square, City Centre, Acropolis Mall, Lindsey Street, Behala, Kakurgachi, Rashbehari Avenue . Watches in Patna: Frazer Road, Chajjubagh, Boring Rd, JAGDEO PATH, KANKARBAGH . Watches in Gautam Budh Nagar: Gaur City Mall . Watches in Bhopal: Db Mall, Malviya Nagar . Watches in Bhubaneswar: Master Canteen, Chandrasekarpur, Rasulgarh . Watches in Kozhikode: Calicut . Watches in Surat: Athwa Lines, VR Mall, Ghod dod Rd, Lp Savani . Watches in Jalandhar: Jalandhar . Watches in Coimbatore: Brookefield, Avinashi Road, R.S. Puram . Watches in Siliguri: City Centre Mall, 815 . Watches in Ranchi: Nucleus Mall, M G Main Road, Western Mall Opp Pantaloons . Watches in Guwahati: City Centre, Roodraksh Mall, Christian Basti . Watches in Salem: Fairlands, Omalur Road . Watches in Panaji: Ozari . Watches in Navi Mumbai: Seawoods, Belapur . Watches in Visakhapatnam: Vip Road, Dwarakanagar . Watches in Nashik: Samarth Nagar . Watches in Vijayawada: M.G. Road . Watches in Madurai: Anna Nagar, Northveli Street . Watches in Jodhpur: Sardarpura . Watches in Udaipur: CelebrationMall, Ashok Nagar . Watches in Prayagraj: Civil Lines . Watches in Jamshedpur: P&M City Centre . Watches in Kanpur: Ppn Market . Watches in Mangalore: Deepa Plaza . Watches in Rajkot: Azzaro Square . Watches in Mysore: Devaraj Urs Road . Watches in Ghaziabad: Mahagun Mall, Shipra Mall, Ambedkar Road . Watches in Pondicherry: Mission Street . Watches in Agra: Sanjay Place . Watches in Nagercoil: KP Road . Watches in Vadodara: RaceCourse Circle . Watches in Belgaum: Tilakwadi . Watches in Bathinda: Mall Road . Watches in Secunderabad: M.G.Road . Watches in Aurangabad: Khatod Complex . Watches in Rohtak: Model Town . Watches in Kolhapur: The ICON Upper . Watches in Dimapur: Nyamo Lotha Road . Watches in Thrissur: Ikkanda Warrier Rd . Watches in Hubli: Coen Road . Watches in Nagpur: Sadar, Medical Square . Watches in Karnal: Kunjpura Road . Watches in Erode: Cutchery Street . Watches in Aligarh: Centre Point . Watches in Tiruchirapalli: Cantonment, Tiruchirapalli . Watches in Nanded: Iti Corner . Watches in Dibrugarh: H.S. Road . Watches in Tirupur: Valarmathi . Watches in Udupi: THENKPETE . Watches in Baramati: Karbhari Chowk . Watches in Patiala: Bhupindra Road . Watches in Gorakhpur: Bank Road . Watches in Mohali: 3B2 Mohali . Watches in Pernem: Mopa Airport . Watches in Srinagar: Srinagar . Watches in Zirakpur: Raksha Business Centre . Watches in Jammu: Jammu . Watches in Faridabad: NIT Faridabad . Watches in Bhagalpur: Ghantaghar Chowk . Watches in Jabalpur: Jabalpur Sadar Road . Watches in Hosur : Bagalur Road ,Shop No 74/A2, .


        </p>
      </div>

      {/* BOTTOM */}
      <div className="footer-bottom">
        <p>© 2026 Watch Store. All Rights Reserved.</p>
      </div>

    </footer>
  );
}

export default Footer;