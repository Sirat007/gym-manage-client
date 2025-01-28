import { Row, Col, Card, Button, Spin, Alert } from "antd";
import { useNavigate, useParams } from "react-router";
import video from "../../assets/video/bg.mp4";
import { FieldTimeOutlined, UserAddOutlined } from "@ant-design/icons";
import {
  useAddBookingMutation,
  useGetClassByIDQuery,
} from "../../redux/features/classes/classApi";
import useGetAuthStatus from "../../hooks/useGetAuthStatus";
import { toast } from "react-toastify";
import { useEffect } from "react";
import {
  useBookingListQuery,
  useProfileQuery,
} from "../../redux/features/auth/authApi";

const ClassDetailsPage = () => {
  const { id } = useParams();
  const { isLoading: isAuthLoading, isLoggedIn } = useGetAuthStatus();
  const navigate = useNavigate();
  const {
    data: classData,
    isLoading,
    isError,
    error,
  } = useGetClassByIDQuery(id);

  const [
    addBooking,
    {
      isLoading: isAddBookingLoading,
      isError: isAddBookingError,
      isSuccess,
      error: addBookingError,
      data,
    },
  ] = useAddBookingMutation();

  useEffect(() => {
    console.log(addBookingError);
    if (isAddBookingError && addBookingError) {
      toast.error(addBookingError?.data?.message || "Something went wrong!");
    }
  }, [isAddBookingError, addBookingError]);

  useEffect(() => {
    if (isSuccess) {
      toast.success("Class booked successfully!");
      navigate("/profile");
    }
  }, [isSuccess, data, navigate]);

  const handleBookNow = async () => {
    if (!isLoggedIn) {
      navigate("/sign-in");
    } else {
      try {
        await addBooking({ fitness_class: id });
      } catch (error) {
        toast.error(error?.message || "Something went wrong!");
      }
    }
  };

  const { data: profile } = useProfileQuery();
  const { data: bookingList } = useBookingListQuery();

  const getSelectedBookinStatus = async (id) => {
    console.log("🚀 ~ getSelectedBookinStatus ~ id:", id);
    console.log("🚀 ~ getSelectedBookinStatus ~ bookingList:", bookingList);

    // Ensure bookingList is defined and an array
    if (!Array.isArray(bookingList)) {
      console.error("🚀 ~ bookingList is not an array or is undefined");
      return false;
    }

    // Use strict equality for comparison
    const booking = bookingList.find((c) => c?.fitness_class === id);

    console.log("🚀 ~ getSelectedBookinStatus ~ booking:", booking);
    return Boolean(booking); // Equivalent to `booking ? true : false`
  };

  // Display a loading spinner while data is being fetched
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  // Display an error message if something went wrong
  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Alert
          message="Something Went Wrong"
          description={error?.message || "Failed to fetch class details."}
          type="error"
          showIcon
        />
      </div>
    );
  }

  return (
    <div className="p-4 pt-28 max-w-7xl mx-auto px-4">
      <Row gutter={[24, 24]} className="items-start">
        {/* Left Section: Class Details */}
        <Col xs={24} md={18}>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h4 className="text-3xl font-bold mb-4">{classData?.name}</h4>
            <p className="text-gray-700 mb-6">{classData?.description}</p>

            {/* Video Section */}
            <div className="mb-6">
              <video
                autoPlay
                loop
                muted
                className="rounded-lg w-full h-96 object-cover"
              >
                <source src={video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>

            {/* Schedule Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
                  <UserAddOutlined />
                  <span>Instructor</span>
                </h2>
                <p className="text-gray-600">{classData?.instructor}</p>
              </div>
              <div>
                <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
                  <FieldTimeOutlined />
                  <span>Schedule</span>
                </h2>
                <p className="text-gray-600">
                  {new Date(classData?.schedule).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </Col>

        {/* Right Section: Booking Card */}
        <Col xs={24} md={6}>
          <Card className="shadow-sm sticky top-0">
            <h2 className="text-2xl font-bold mb-4">{classData?.name}</h2>
            <p className="text-gray-700 mb-4">
              By: <span className="font-bold">{classData?.instructor}</span>
            </p>
            {profile?.length && profile[0]?.user?.user_type === "member" ? (
              <Button
                loading={isAddBookingLoading}
                onClick={handleBookNow}
                type="primary"
                block
                size="large"
                // disabled={getSelectedBookinStatus(id)}
              >
                {/* {getSelectedBookinStatus(id) ? "Booked" : "Book Now"} */}
                Book Now
              </Button>
            ) : null}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ClassDetailsPage;
