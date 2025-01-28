import { useEffect, useState } from "react";
import { useNavigate, useLocation, NavLink } from "react-router";
import {
  DollarCircleFilled,
  GatewayOutlined,
  HomeFilled,
  InfoCircleOutlined,
  LockOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Menu, Dropdown, Avatar, Drawer } from "antd";
import Logo from "../../logo";
import { List } from "lucide-react";
import useGetAuthStatus from "../../../hooks/useGetAuthStatus";
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/features/auth/authSlice";
import {
  useLazyLogoutQuery,
  useProfileQuery,
} from "../../../redux/features/auth/authApi";
import { toast } from "react-toastify";

const Navbar = () => {
  const { data } = useProfileQuery();
  const { isLoggedIn } = useGetAuthStatus();
  const items = [
    {
      label: "Home",
      key: "home",
      icon: <HomeFilled />,
      path: "/", // Specify the route path
    },
    {
      label: "Classes",
      key: "classes",
      icon: <GatewayOutlined />,
      path: "/classes",
    },
    {
      label: "Plans",
      key: "plans",
      icon: <DollarCircleFilled />,
      path: "/plans",
    },
    data?.length && data[0]?.user?.user_type === "member"
      ? {
          label: "About",
          key: "about",
          icon: <InfoCircleOutlined />,
          path: "/about",
        }
      : {
          label: "Members",
          key: "members",
          icon: <UserOutlined />,
          path: "/members",
        },
    !isLoggedIn
      ? {
          label: "Sign In",
          key: "signin",
          icon: <LockOutlined />,
          path: "/sign-in",
        }
      : null,
  ].filter(Boolean); // Filter out any falsy values

  const userMenuItems = [
    // {
    //   key: "dashboard",
    //   label: "Dashboard",
    // },
    data?.length &&
      data[0]?.user?.user_type === "member" && {
        key: "profile",
        label: "Profile",
      },

    // {
    //   key: "profile",
    //   label: "Profile",
    // },
    {
      key: "logout",
      label: "Logout",
    },
  ].filter(Boolean);
  const navigate = useNavigate();
  const location = useLocation(); // Hook to get the current URL
  const [current, setCurrent] = useState("");

  const dispatch = useDispatch();

  // Set the active menu item based on the current URL
  useEffect(() => {
    const matchingItem = items.find((item) => item.path === location.pathname);
    if (matchingItem) {
      setCurrent(matchingItem.key);
    }
  }, [location.pathname]);

  const onClick = (e) => {
    const selectedItem = items.find((item) => item.key === e.key);
    if (selectedItem) {
      navigate(selectedItem.path); // Navigate to the selected route
    }
    setCurrent(e.key);
  };

  const [triggerLogout] = useLazyLogoutQuery();

  const handleLogout = async () => {
    try {
      await triggerLogout().unwrap();
      toast.success("Logged out successfully!");
    } catch (error) {
      console.log("🚀 ~ handleLogout ~ error:", error);
      // toast.error(error?.data?.message || "Failed to log out");
    }
  };

  const onUserMenuClick = async (e) => {
    console.log("user menu click ", e);
    if (e.key === "profile") {
      navigate("/profile");
    } else if (e.key === "logout") {
      await handleLogout();
      dispatch(logout());
      navigate("/");
    }
    // Handle user menu item clicks
  };

  const userMenu = <Menu onClick={onUserMenuClick} items={userMenuItems} />;

  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <div className="fixed right-0 left-0 bg-white opacity-75 shadow z-50">
      {/* Desktop Navbar */}
      <div className="md:flex justify-between items-center max-w-7xl mx-auto px-4 py-3 hidden">
        <div className="flex-shrink-0">
          <Logo />
        </div>
        <div className="flex-grow flex justify-end">
          <Menu
            onClick={onClick}
            selectedKeys={[current]}
            mode="horizontal"
            items={items?.map(({ label, key, icon }) => ({
              label,
              key,
              icon,
            }))}
            className="flex"
            style={{
              flexGrow: 1,
              justifyContent: "flex-end",
              borderBottom: "none",
            }}
          />
          {/* {isLoggedIn && data?.length && data[0]?.user_type != "member" ? (
            <Dropdown overlay={userMenu} trigger={["click"]}>
              <div className="flex items-center cursor-pointer ml-4">
                <Avatar icon={<UserOutlined />} />
              </div>
            </Dropdown>
          ) : null} */}
          <Dropdown overlay={userMenu} trigger={["click"]}>
            <div className="flex items-center cursor-pointer ml-4">
              <Avatar icon={<UserOutlined />} />
            </div>
          </Dropdown>
        </div>
      </div>

      {/* Mobile Navbar */}
      <div className="md:hidden flex justify-between items-center py-4 px-4">
        <Logo />
        <div className="flex items-center gap-2">
          {isLoggedIn && (
            <Dropdown overlay={userMenu} trigger={["click"]}>
              <div className="flex items-center cursor-pointer ml-4">
                <Avatar icon={<UserOutlined />} />
              </div>
            </Dropdown>
          )}
          <List className="w-10 cursor-pointer" onClick={showDrawer} />
        </div>
      </div>

      {/* Drawer for Mobile */}
      <Drawer title="Menu" onClose={onClose} open={open}>
        <div className="flex flex-col space-y-4">
          {items.map(({ label, key, icon, path }) => (
            <NavLink
              to={path}
              key={key}
              className={({ isActive }) =>
                `flex items-center space-x-2 p-2 rounded-lg ${
                  isActive ? "bg-blue-100 text-blue-600" : "text-gray-700"
                }`
              }
              onClick={onClose} // Close the drawer when a link is clicked
            >
              <span>{icon}</span>
              <span>{label}</span>
            </NavLink>
          ))}
        </div>
      </Drawer>
    </div>
  );
};

export default Navbar;
