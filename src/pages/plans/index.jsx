import {
  Button,
  Spin,
  Alert,
  Empty,
  Drawer,
  Modal,
  Form,
  Input,
  InputNumber,
  message,
  Select,
} from "antd";
import {
  useGetPlanListQuery,
  useAddPlanMutation,
  useUpdatePlanMutation,
  useDeletePlanMutation,
  useAddPlanBookingMutation,
} from "../../redux/features/plans/planApi";
import {
  useEditProfileMutation,
  useProfileQuery,
} from "../../redux/features/auth/authApi";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../redux/features/auth/authSlice";
import { useEffect, useState } from "react";
import useGetAuthStatus from "../../hooks/useGetAuthStatus";
import { useNavigate } from "react-router";
import ButtonGroup from "antd/es/button/button-group";

const PricingPlansPage = () => {
  const {
    data: plans,
    isLoading,
    isSuccess,
    isError,
    error,
    refetch: refetchPlans,
  } = useGetPlanListQuery();

  const { data: profileData } = useProfileQuery();
  console.log("🚀 ~ PricingPlansPage ~ profileData:", profileData);
  const [newPlanId, setNewPlanID] = useState(null);
  const { userTypeInfo } = useGetAuthStatus();

  const { isLoggedIn } = useGetAuthStatus();
  // const user = useSelector(selectCurrentUser);
  const navigate = useNavigate();

  // States for Add, Edit, and Delete
  const [isAddDrawerVisible, setIsAddDrawerVisible] = useState(false);
  const [isEditDrawerVisible, setIsEditDrawerVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  // API Mutations
  const [addPlan, { isLoading: isAddPlanLoading }] = useAddPlanMutation();
  const [updatePlan, { isLoading: isUpdatePlanLoading }] =
    useUpdatePlanMutation();
  const [deletePlan, { isLoading: isDeletePlanLoading }] =
    useDeletePlanMutation();
  const [
    editProfile,
    {
      isLoading: editProfileLoading,
      isError: isEditProfileError,
      error: editProfileError,
      isSuccess: editProfileSuccess,
    },
  ] = useEditProfileMutation();

  // Handle Add Plan
  const handleAddPlan = async (values) => {
    try {
      await addPlan(values).unwrap();
      toast.success("Plan added successfully!");
      setIsAddDrawerVisible(false);
      refetchPlans();
    } catch (error) {
      toast.error(error?.data?.message || "Failed to add plan");
    }
  };

  // Handle Edit Plan
  const handleEditPlan = async (values) => {
    try {
      await updatePlan({ id: selectedPlan?.id, planInfo: values }).unwrap();
      toast.success("Plan updated successfully!");
      setIsEditDrawerVisible(false);
      refetchPlans();
    } catch (error) {
      toast.error(error?.data?.message || "Failed to update plan");
    }
  };

  // Handle Delete Plan
  const handleDeletePlan = async () => {
    try {
      await deletePlan(selectedPlan?.id).unwrap();
      toast.success("Plan deleted successfully!");
      setIsDeleteModalVisible(false);
      refetchPlans();
    } catch (error) {
      toast.error(error?.data?.message || "Failed to delete plan");
    }
  };

  // Handle Edit Profile (Plan Selection)
  const handleEditProfile = async (id) => {
    setNewPlanID(id);
    try {
      if (!isLoggedIn) {
        navigate("/sign-in");
        return;
      }
      await editProfile({
        userInfo: { plan: id },
        id: profileData?.length && profileData[0]?.id,
      });
    } catch (error) {
      toast.error(error?.message || "Something went wrong");
    }
  };

  // Effects for Edit Profile
  useEffect(() => {
    if (editProfileSuccess) {
      toast.success("Plan updated successfully!");
    }
  }, [editProfileSuccess]);

  useEffect(() => {
    if (isEditProfileError) {
      toast.error(editProfileError?.data?.message || "Failed to update plan");
    }
  }, [isEditProfileError, editProfileError]);

  // Loading State
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  // Error State
  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Alert
          message="Something Went Wrong"
          description={error?.message || "Failed to fetch pricing plans."}
          type="error"
          showIcon
        />
      </div>
    );
  }

  // No Data State
  if (isSuccess && (!plans || plans.length === 0)) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Empty description="No pricing plans found." />
      </div>
    );
  }

  return (
    <div className="py-16 bg-gray-50 pt-28">
      <div className="max-w-7xl mx-auto px-4">
        {/* Page Title */}
        <div className="text-center mb-12">
          <h3 className="text-4xl font-bold">Pricing Plans</h3>
          <p className="text-lg text-gray-600 mt-4">
            Choose the plan that best fits your fitness goals.
          </p>
        </div>

        {/* Add Plan Button (Visible to Admins) */}
        {userTypeInfo === "member" ? null : (
          <div className="mb-4 flex justify-end">
            <Button type="primary" onClick={() => setIsAddDrawerVisible(true)}>
              Add Plan
            </Button>
          </div>
        )}

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans?.map((plan) => (
            <div
              key={plan.id}
              className="bg-white rounded-lg shadow-lg p-8 text-center transform transition-all hover:scale-105 hover:shadow-xl"
            >
              <h2 className="text-2xl font-bold mb-4 text-blue-600">
                {plan?.name?.toUpperCase()}
              </h2>
              <p className="text-4xl font-bold text-blue-600 mb-4">
                ${plan.price}
              </p>
              <p className="text-gray-600 mb-6">{plan.description}</p>

              {/* Buttons for Members */}
              {userTypeInfo === "member" ? (
                <Button
                  type={
                    profileData[0]?.plan === plan?.id ? "dashed" : "primary"
                  }
                  disabled={profileData[0]?.plan === plan?.id}
                  block
                  onClick={() => handleEditProfile(plan?.id)}
                  loading={
                    (editProfileLoading && newPlanId === plan?.id) || isLoading
                  }
                >
                  {isLoading
                    ? "Loading..."
                    : profileData[0]?.plan === plan?.id && isLoggedIn
                    ? "Selected"
                    : "Get Started"}
                </Button>
              ) : (
                // Buttons for Admins
                <ButtonGroup>
                  <Button
                    type="primary"
                    onClick={() => {
                      setSelectedPlan(plan);
                      setIsEditDrawerVisible(true);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    type="primary"
                    danger
                    onClick={() => {
                      setSelectedPlan(plan);
                      setIsDeleteModalVisible(true);
                    }}
                  >
                    Delete
                  </Button>
                </ButtonGroup>
              )}
            </div>
          ))}
        </div>

        {/* Add Plan Drawer */}
        <Drawer
          title="Add Plan"
          placement="right"
          onClose={() => setIsAddDrawerVisible(false)}
          visible={isAddDrawerVisible}
          width={500}
        >
          <Form onFinish={handleAddPlan} layout="vertical">
            {/* <Form.Item
              name="name"
              label="Plan Name"
              rules={[{ required: true }]}
            >
              <Input placeholder="Enter plan name" />
            </Form.Item> */}
            <Form.Item
              name="name"
              label="Plan Name"
              rules={[{ required: true, message: "Please select a plan name" }]}
            >
              <Select placeholder="Select plan name">
                <Select.Option value="weekly">Weekly</Select.Option>
                <Select.Option value="monthly">Monthly</Select.Option>
                <Select.Option value="yearly">Yearly</Select.Option>
              </Select>
            </Form.Item>
            {/* <Form.Item name="price" label="Price" rules={[{ required: true }]}>
              <InputNumber
                placeholder="Enter price"
                style={{ width: "100%" }}
              />
            </Form.Item> */}
            <Form.Item name="price" label="Price" rules={[{ required: true }]}>
              <InputNumber
                placeholder="Enter price"
                style={{ width: "100%" }}
              />
            </Form.Item>
            <Form.Item
              name="description"
              label="Description"
              rules={[{ required: true }]}
            >
              <Input.TextArea placeholder="Enter description" />
            </Form.Item>
            <Button type="primary" htmlType="submit" loading={isAddPlanLoading}>
              Add Plan
            </Button>
          </Form>
        </Drawer>

        {/* Edit Plan Drawer */}
        <Drawer
          title="Edit Plan"
          placement="right"
          onClose={() => setIsEditDrawerVisible(false)}
          visible={isEditDrawerVisible}
          width={500}
        >
          <Form
            initialValues={{
              name: selectedPlan?.name,
              price: selectedPlan?.price,
              description: selectedPlan?.description,
            }}
            onFinish={handleEditPlan}
            layout="vertical"
          >
            {/* <Form.Item
              name="name"
              label="Plan Name"
              rules={[{ required: true }]}
            >
              <Input placeholder="Enter plan name" />
            </Form.Item> */}
            <h6 className=" mb-4 font-semibold text-lg">
              Plan: {selectedPlan?.name}
            </h6>
            {/* <Form.Item
              name="name"
              label="Plan Name"
              rules={[{ required: true, message: "Please select a plan name" }]}
            >
              <Select placeholder="Select plan name">
                <Select.Option value="weekly">Weekly</Select.Option>
                <Select.Option value="monthly">Monthly</Select.Option>
                <Select.Option value="yearly">Yearly</Select.Option>
              </Select>
            </Form.Item> */}
            {/* <Form.Item name="price" label="Price" rules={[{ required: true }]}>
              <InputNumber
                placeholder="Enter price"
                style={{ width: "100%" }}
              />
            </Form.Item> */}
            <Form.Item name="price" label="Price" rules={[{ required: true }]}>
              <InputNumber
                placeholder="Enter price"
                style={{ width: "100%" }}
              />
            </Form.Item>
            <Form.Item
              name="description"
              label="Description"
              rules={[{ required: true }]}
            >
              <Input.TextArea placeholder="Enter description" />
            </Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={isUpdatePlanLoading}
            >
              Update Plan
            </Button>
          </Form>
        </Drawer>

        {/* Delete Plan Modal */}
        <Modal
          title="Confirm Delete"
          visible={isDeleteModalVisible}
          onOk={handleDeletePlan}
          onCancel={() => setIsDeleteModalVisible(false)}
          okText="Delete"
          okButtonProps={{ danger: true }}
          confirmLoading={isDeletePlanLoading}
        >
          <p>
            Are you sure you want to delete the plan "{selectedPlan?.name}"?
          </p>
        </Modal>
      </div>
    </div>
  );
};

export default PricingPlansPage;
