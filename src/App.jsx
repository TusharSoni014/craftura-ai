import "./App.scss";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ConfigProvider, Modal, theme, Drawer } from "antd";
import { ToastContainer, Slide } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { updatePostDetailOpenState } from "./redux/slices/postDetailsSlice";
import {
  closeSignonModal,
  toggleSignonModalOpen,
} from "./redux/slices/utilSlice";
import "react-toastify/dist/ReactToastify.css";
import AllRoutes from "./AllRoutes";
import Header from "./components/Header/Header";
import PostDetails from "./components/PostDetails/PostDetails";
import GoogleButton from "react-google-button";

function App() {
  const dispatch = useDispatch();

  useEffect(()=>{
    window.location = "https://www.craftura.art";
  },[])

  const postDetailOpenState = useSelector(
    (state) => state.postDetailsSlice.postDetailOpenState
  );
  const isSignonModalOpen = useSelector(
    (state) => state.utilSlice.isSignonModalOpen
  );

  const onDrawerClose = () => {
    dispatch(updatePostDetailOpenState(false));
  };

  async function handleGoogleOauth() {
    const loginURL = `${import.meta.env.VITE_SERVER_URL}/google/login`;
    window.location.href = loginURL;
  }
  useEffect(() => {
    const body = document.body;
    if (postDetailOpenState) {
      body.style.overflow = "hidden";
    } else {
      body.style.overflow = "auto";
    }

    return () => {
      body.style.overflow = "auto";
    };
  }, [postDetailOpenState]);

  return (
    <>
      <ToastContainer
        toastClassName="toast-container"
        position="top-right"
        transition={Slide}
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        limit={5}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        theme="light"
      />
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "dodgerblue",
          },
        }}
      >
        <Header />
        <div className="site-content">
          <AllRoutes />
        </div>
        <Modal
          title="Login / Signup"
          open={isSignonModalOpen}
          onCancel={() => dispatch(closeSignonModal())}
          className="signon-modal"
          footer={false}
          width={400}
          maskClosable={false}
          centered={true}
        >
          <div className="signon-modal-inner-container">
            <GoogleButton onClick={handleGoogleOauth} />
            <small className="policy-text">
              By creating an account on our website, you are agreeing to our,{" "}
              <Link
                onClick={() => dispatch(toggleSignonModalOpen())}
                to="/privacy"
              >
                Privacy Policy
              </Link>{" "}
              and{" "}
              <Link
                onClick={() => dispatch(toggleSignonModalOpen())}
                to="/termsofservice"
              >
                Terms of Service
              </Link>
            </small>
          </div>
        </Modal>
        <Drawer
          title="Post Details"
          placement="bottom"
          closable={true}
          open={postDetailOpenState}
          onClose={onDrawerClose}
          height="calc(100%)"
          className="post-details-drawer"
          mask={false}
        >
          <PostDetails />
        </Drawer>
      </ConfigProvider>
    </>
  );
}

export default App;
