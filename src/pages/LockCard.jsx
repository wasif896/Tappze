import styles from "../pages/LockCard.module.css"; // Import the CSS Module
import person from "../assets/icons/personlogo.png";
import lock from "../assets/icons/download.png";
import googlePlay from "../assets/icons/googlePlay.png";
import withApple from "../assets/icons/withApple.png";
import tapze from "../assets/icons/tappze.png";

const LockCard = () => {
  return (
    <main className={styles.main}>
      <div className={styles.section}>
        <div className="bg-gray-100 m-2 h-full">
          <div
            className="flex grid-cols-1 m-auto pt-2 pb-1"
            style={{ backgroundColor: "#f6f6f6" }}
          >
            <div
              className={`${styles.margin} m-auto rounded-2xl overflow-hidden w-full md:max-w-xs my-3 bg-gray-100 pt-5`}
              style={{
                borderRadius: "20px",
                border: "1px solid black",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              <div className="grid grid-cols-1">
                <div className="flex items-center mt-8 my-20">
                  <img
                    src={person}
                    className={`m-auto ${styles.profileimg}`}
                    alt="profile-img"
                    width="150px"
                    style={{ marginTop: "120px" }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1">
                <div className="flex items-center mt-8 mb-6">
                  <img
                    src={lock}
                    className={`m-auto ${styles.profileimg}`}
                    alt="download-img"
                    width="60px"
                    style={{ marginTop: "120px" }}
                  />
                </div>
              </div>

              <div className="w-full flex items-center pb-8">
                <div className="flex w-full items-center my-auto mx-8">
                  <p
                    className="text-center w-full"
                    style={{
                      fontSize: "15px",
                      marginTop: "30px",
                      marginBottom: "30px",
                      fontWeight: "bold",
                    }}
                  >
                    This profile is not activated yet on our system
                  </p>
                </div>
              </div>

              <div className="text-center">
                <p style={{ fontSize: "14px" }}>
                  Download <b>Tappze</b> free app
                  <br /> to activate & customize your profile
                </p>
              </div>

              <div className={styles.stores}>
                <a
                  href="https://play.google.com/store/apps/details?id=com.firstbusiness.app"
                  className="me-2"
                >
                  <img
                    src={googlePlay}
                    className="img-fluid"
                    alt="google-play"
                    style={{ height: "5vh" }}
                  />
                </a>
                <a href="https://apps.apple.com/pk/app/f1rst-card/id1635152822">
                  <img
                    src={withApple}
                    className="img-fluid"
                    style={{ height: "6vh" }}
                    alt="apple-store"
                  />
                </a>
              </div>
            </div>

            <div
              className="w-full flex items-center py-6"
              style={{ marginLeft: "40px" }}
            >
              <div className="flex items-center m-auto">
                <a style={{ textDecoration: "none" }}>
                  <div
                    className={`d-flex align-items-center ${styles.wrapper}`}
                  >
                    <div className={styles.image}>
                      <img
                        src={tapze}
                        style={{
                          height: "47px",
                          backgroundColor: "black",
                          width: "100px",
                          padding: "10px",
                        }}
                        alt="card-img"
                      />
                    </div>
                    <div className={styles["left-caption"]}>
                      <span
                        className="text-sm"
                        style={{ color: "black", fontSize: "15px" }}
                      >
                        <b>TappZe</b>
                      </span>
                      <br />
                      <span
                        className="text-sm"
                        style={{ color: "black", fontSize: "15px" }}
                      >
                        Gets yours now at
                        <br />
                        <a
                          href="https://tappze.com/"
                          style={{
                            color: "black",
                            fontWeight: 700,
                            fontSize: "small",
                            textDecoration: "none",
                          }}
                        >
                          www.tappze.com
                        </a>
                      </span>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LockCard;
