import styles from "../pages/Home.module.css";
import profile from "../assets/profile/profileplaceholder.jpg";
import { QRCodeCanvas } from "qrcode.react";
import AppStore from "../assets/icons/withApple.png";
import GetIntogoogle from "../assets/icons/googlePlay.png";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { getDatabase, ref, get, update, push } from "firebase/database";
import { LuSquareArrowUp } from "react-icons/lu";
import {
  getStorage,
  ref as storageRef,
  getDownloadURL,
} from "firebase/storage";
import { query, orderByChild, equalTo } from "firebase/database";

import app from "../Firebase";
import phone from "../assets/icons/phone.png";
import instagram from "../assets/icons/instagram.png";
import facebook from "../assets/icons/facebook.png";
import tiktok from "../assets/icons/tiktok.png";
import whatsapp from "../assets/icons/whatsapp.png";
import linkedin from "../assets/icons/linkedin.png";
import telegram from "../assets/icons/telegram.png";
import snapchat from "../assets/icons/snapchat.png";
import twitter from "../assets/icons/twitter.png";
import website from "../assets/icons/website.png";
import youtube from "../assets/icons/youtube.png";
import spotify from "../assets/icons/spotify.png";
import email from "../assets/icons/email.png";
import paypal from "../assets/icons/paypal.png";
import pinterest from "../assets/icons/pinterest.png";
import skype from "../assets/icons/skype.png";
import calendly from "../assets/icons/calendly.png";

const Home = () => {
  const { id } = useParams();
  const [userRecord, setUserRecord] = useState({});
  const [profileUrl, setProfileUrl] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const qrData = `https://profile.tappze.ca/${id}`;
  const qrRef = useRef(null);
  const profileRef = useRef(null);
  const navigate = useNavigate();
  console.log(isLoading);
  const icons = {
    phone,
    instagram,
    facebook,
    tiktok,
    whatsapp,
    linkedin,
    telegram,
    snapchat,
    twitter,
    website,
    youtube,
    spotify,
    email,
    paypal,
    pinterest,
    skype,
    calendly,
  };

  const fetchUserData = async () => {
    try {
      const db = getDatabase(app);
      const storage = getStorage(app);

      const userRef = ref(db, `Users/${id}`);
      const snapshot = await get(userRef);

      if (snapshot.exists()) {
        const userData = snapshot.val();
        if (userData?.profileOn == 0) {
          navigate("/lockCard");
        }
        setUserRecord(userData);

        if (userData?.profileUrl) {
          const imageRef = storageRef(storage, userData.profileUrl);
          const url = await getDownloadURL(imageRef);
          setProfileUrl(url);
        }
      } else {
        navigate("/lockCard");
        console.log("No matching record found");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const checkHttp = (link, name) => {
    let newLink = "";
    if (name === "phone") {
      newLink = link.startsWith("tel") ? link : `tel:${link}`;
    } else if (name === "email") {
      newLink = link.startsWith("mailto") ? link : `mailto:${link}`;
    } else {
      newLink = link.startsWith("http") ? link : `https://${link}`;
    }
    return newLink;
  };
  const handleUpdateLinkAnalytics = async (linkName) => {
    try {
      const db = getDatabase(app);
      const analyticRef = ref(db, "Analytic");

      const analyticsQuery = query(
        analyticRef,
        orderByChild("userid"),
        equalTo(id)
      );
      const snapshot = await get(analyticsQuery);

      if (snapshot.exists()) {
        const record = snapshot.val();
        const analyticsValues = Object.values(record)[0];
        const analyticsKey = Object.keys(record)[0];
        const currentTimestamp = Math.floor(Date.now() / 1000);
        const linkIndex = analyticsValues.links?.findIndex(
          (link) => link.name.toLowerCase() === linkName.toLowerCase()
        );

        if (linkIndex >= 0) {
          analyticsValues.links[linkIndex].clicks += 1;
          analyticsValues.links[linkIndex].updated_date = currentTimestamp;
        } else {
          analyticsValues.links = analyticsValues.links || [];
          analyticsValues.links.push({
            clicks: 1,
            name: capitalizeFirstLetter(linkName),
            updated_date: currentTimestamp,
          });
        }
        await update(ref(db, `Analytic/${analyticsKey}`), {
          links: analyticsValues.links,
          linksEngCrntWk: (analyticsValues.linksEngCrntWk || 0) + 1,
        });
      } else {
        console.error("No data found in analytics.");
      }
    } catch (error) {
      console.error("Error updating link analytics:", error);
    }
  };
  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  const handleIconClick = async (item) => {
    const iconsArray = [
      { id: 1, name: "phone", baseUrl: "tel:" },
      { id: 2, name: "instagram", baseUrl: "https://www.instagram.com/" },
      { id: 3, name: "facebook", baseUrl: "" },
      { id: 4, name: "tiktok", baseUrl: "https://www.tiktok.com/@" },
      { id: 5, name: "whatsapp", baseUrl: "https://wa.me/" },
      { id: 6, name: "linkedin", baseUrl: "" },
      { id: 7, name: "telegram", baseUrl: "https://t.me/" },
      { id: 8, name: "snapchat", baseUrl: "https://www.snapchat.com/add/" },
      { id: 9, name: "twitter", baseUrl: "https://twitter.com/" },
      { id: 10, name: "website", baseUrl: "" },
      { id: 11, name: "youtube", baseUrl: "" },
      { id: 12, name: "spotify", baseUrl: "" },
      { id: 13, name: "email", baseUrl: "mailto:" },
      { id: 14, name: "paypal", baseUrl: "" },
      { id: 15, name: "pinterest", baseUrl: "" },
      { id: 16, name: "skype", baseUrl: "" },
      { id: 17, name: "calendly", baseUrl: "" },
    ];

    const iconData = iconsArray.find(
      (icon) => icon.name === item.name.toLowerCase()
    );

    if (iconData) {
      await handleUpdateLinkAnalytics(item.name.toLowerCase());
      const url = `${iconData.baseUrl}${item.value}`;
      let correctUrl = checkHttp(url, item.name.toLowerCase());
      window.open(correctUrl, "_blank");
    } else {
      console.error("Icon not found in iconsArray for:", item.name);
    }
  };

  const handleAddToContacts = () => {
    const fullName = userRecord?.name || "Unknown Name";
    const phone = userRecord?.phone || "";
    const email = userRecord?.email || "";
    const profileImage = profileUrl || "";

    let photoField = "";
    if (profileImage) {
      if (profileImage.startsWith("data:image")) {
        photoField = `PHOTO;ENCODING=BASE64;TYPE=JPEG:${
          profileImage.split(",")[1]
        }`;
      } else {
        photoField = `PHOTO;VALUE=URL:${profileImage}`;
      }
    }
    let vCardContent = `BEGIN:VCARD
      VERSION:3.0
      FN:${fullName}
      TEL:${phone}
      EMAIL:${email}
      ${photoField}
      `;

    if (userRecord.links && userRecord.links.length > 0) {
      userRecord.links.forEach((link) => {
        const type = link.name.toUpperCase();
        let correctUrl = link?.value;
        const iconsArray = [
          { id: 1, name: "phone", baseUrl: "tel:" },
          { id: 2, name: "instagram", baseUrl: "https://www.instagram.com/" },
          { id: 3, name: "facebook", baseUrl: "" },
          { id: 4, name: "tiktok", baseUrl: "https://www.tiktok.com/@" },
          { id: 5, name: "whatsapp", baseUrl: "https://wa.me/" },
          { id: 6, name: "linkedin", baseUrl: "" },
          { id: 7, name: "telegram", baseUrl: "https://t.me/" },
          { id: 8, name: "snapchat", baseUrl: "https://www.snapchat.com/add/" },
          { id: 9, name: "twitter", baseUrl: "https://twitter.com/" },
          { id: 10, name: "website", baseUrl: "" },
          { id: 11, name: "youtube", baseUrl: "" },
          { id: 12, name: "spotify", baseUrl: "" },
          { id: 13, name: "email", baseUrl: "mailto:" },
          { id: 14, name: "paypal", baseUrl: "" },
          { id: 15, name: "pinterest", baseUrl: "" },
          { id: 16, name: "skype", baseUrl: "" },
          { id: 17, name: "calendly", baseUrl: "" },
        ];
        const iconData = iconsArray.find(
          (icon) => icon.name === link.name.toLowerCase()
        );

        if (iconData) {
          const url = `${iconData.baseUrl}${link.value}`;
          correctUrl = checkHttp(url, link.name.toLowerCase());
        }
        vCardContent += `URL;TYPE=${type}:${correctUrl}\n`;
      });
    }
    vCardContent += "END:VCARD";
    return vCardContent;
  };

  const downloadVCard = (vCardString) => {
    const blob = new Blob([vCardString], { type: "text/vcard" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "updated_contact.vcf";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleButtonClick = () => {
    const updatedVCard = handleAddToContacts();
    downloadVCard(updatedVCard);
  };

  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const updateTotalClicks = async (userid) => {
    if (!userid) {
      console.error("Error: userID is required to update total clicks.");
      return;
    }
    try {
      const db = getDatabase(app);
      const analyticRef = ref(db, "Analytic");

      const analyticsQuery = query(
        analyticRef,
        orderByChild("userid"),
        equalTo(userid)
      );
      const snapshot = await get(analyticsQuery);

      if (snapshot.exists()) {
        const data = snapshot.val();
        const analyticsKey = Object.keys(data)[0]; // Getting the first key for the found user
        const currentClicks = data[analyticsKey].totalClicks || 0; // Get totalClicks for the user

        await update(ref(db, `Analytic/${analyticsKey}`), {
          totalClicks: currentClicks + 1,
        });
      } else {
        const newUserRef = push(analyticRef);
        const pushKey = newUserRef.key;

        await update(ref(db, `Analytic/${pushKey}`), {
          id: pushKey,
          linksEngCrntWk: 0,
          linksEngPastWk: 0,
          startingDate: 1684871563, // Replace with your actual starting date
          tContactsMeCrntWk: 0,
          tContactsMePastWk: 0,
          totalClicks: 1,
          userid: userid,
        });
      }
    } catch (error) {
      console.error("Error updating total clicks:", error);
    }
  };

  useEffect(() => {
    fetchUserData();
    updateTotalClicks(id);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, [id]);

  return (
    <main className={styles.main}>
      {isLoading ? (
        <div id={styles.preloaders}>
          <div className={styles.loader}></div>
        </div>
      ) : (
        <div className={styles.section}>
          <div className={styles.profileCard} ref={profileRef}>
            <div className={styles.avatar}>
              <img
                src={profileUrl || profile}
                width="90px"
                alt="Profile"
                style={{ borderRadius: "100px" }}
              />
            </div>
            <p className={styles.name}>{userRecord?.name}</p>
            <p className={styles.username}>{userRecord?.username}</p>
            <p className={styles.email}>{userRecord?.email}</p>
          </div>

          <div className={styles.buttons}>
            <button
              className={styles.qrButton}
              onClick={(e) => {
                e.preventDefault();
                scrollToSection(qrRef);
              }}
            >
              QR code
            </button>
            <button className={styles.addButton} onClick={handleButtonClick}>
              Add to contacts
            </button>
          </div>

          <div className={styles.iconsGrid}>
            {userRecord?.links?.map((item) => {
              const iconSrc = icons[item.name.toLowerCase()];
              return (
                <div className={styles.icon} key={item.id}>
                  <img
                    src={iconSrc}
                    width="60px"
                    alt={item.name}
                    onClick={() => handleIconClick(item)}
                  />
                  <p>{item.name}</p>
                </div>
              );
            })}
          </div>

          <div className={styles.qrSection} ref={qrRef}>
            <h3 className={styles.title}>My QR Code</h3>
            <div className={styles.qrContainer}>
              <p></p>
              <QRCodeCanvas
                value={qrData}
                size={130}
                bgColor={"#ffffff"}
                fgColor={"#000000"}
                className={styles.qrImage}
              />
              <LuSquareArrowUp
                className={styles.arrow}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(profileRef);
                }}
              />
            </div>
            <div className={styles.poweredBy}>
              <p style={{ fontSize: "15px" }}>
                Powered by <strong>Tappze™</strong>
              </p>
            </div>
            <div className={styles.storeButtons}>
              <a
                href="https://play.google.com/store/apps/datasafety?id=com.tappze.app"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={GetIntogoogle} alt="Google Play" />
              </a>
              <a
                href="https://apps.apple.com/ca/app/tappze/id1638158364"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={AppStore} alt="App Store" />
              </a>
            </div>
            <p className={styles.footerText}>
              Get yours now at{" "}
              <a
                href="https://www.tappze.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                www.tappze.com
              </a>
            </p>
          </div>
        </div>
      )}
    </main>
  );
};

export default Home;
