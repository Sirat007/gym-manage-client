import {
  FieldTimeOutlined,
  UserAddOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { Button, Drawer, Form, Input, Modal, message } from "antd";
import { useNavigate } from "react-router";
import { useProfileQuery } from "../../../redux/features/auth/authApi";
import { useEffect, useState } from "react";
import {
  useDeleteClassMutation,
  useEditClassMutation,
} from "../../../redux/features/classes/classApi";
import { toast } from "react-toastify";

/* eslint-disable react/prop-types */
const ClassCard = ({ classData }) => {
  const navigate = useNavigate();
  const formattedSchedule = new Date(classData?.schedule).toLocaleString();
  const { data: profile } = useProfileQuery();

  // State for edit drawer visibility
  const [isEditDrawerVisible, setIsEditDrawerVisible] = useState(false);

  // State for delete confirmation modal visibility
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  const [
    editClass,
    { isLoading: editLoading, isError: editError, isSuccess: editSuccess },
  ] = useEditClassMutation();
  const [
    deleteClass,
    {
      isLoading: deleteLoading,
      isError: deleteError,
      isSuccess: deleteSuccess,
    },
  ] = useDeleteClassMutation();

  // Handle edit action
  const handleEdit = () => {
    setIsEditDrawerVisible(true); // Show the edit drawer
  };

  // Handle delete action
  const handleDelete = () => {
    setIsDeleteModalVisible(true); // Show the delete confirmation modal
  };

  useEffect(() => {
    if (deleteSuccess) {
      toast.success("Class delete successfully!");
      setIsDeleteModalVisible(false);
    }
  }, [deleteSuccess]);
  useEffect(() => {
    if (deleteError) {
      toast.error("Failed to delete class!");
      // setIsEditDrawerVisible(false);
    }
  }, [deleteError]);

  // Handle delete confirmation
  const handleDeleteConfirm = async () => {
    // Add your delete logic here
    console.log("Deleting class with ID:", classData?.id);
    try {
      await deleteClass(classData?.id);
    } catch (error) {
      console.log("🚀 ~ handleDeleteConfirm ~ error:", error);
      toast.error("Failed to delete class");
    }
    // message.success("Class deleted successfully");
    // Close the modal
  };

  useEffect(() => {
    if (editSuccess) {
      toast.success("Class edited successfully!");
      setIsEditDrawerVisible(false);
    }
  }, [editSuccess]);
  useEffect(() => {
    if (editError) {
      toast.error("Failed to edit class!");
      // setIsEditDrawerVisible(false);
    }
  }, [editError]);

  // Handle edit form submission
  const onEditFormFinish = async (values) => {
    console.log("Updated class data:", values);
    // message.success("Class updated successfully");
    try {
      await editClass({ classInfo: values, id: classData?.id });
    } catch (error) {
      console.log("🚀 ~ onEditFormFinish ~ error:", error);
      toast.error("Failed to edit class");
    }
    // Close the edit drawer
  };

  // Handle edit form submission failure
  const onEditFormFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    message.error("Please fill in all fields correctly");
  };

  // Convert schedule to YYYY-MM-DDTHH:MM format
  const formatScheduleForInput = (schedule) => {
    const date = new Date(schedule);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  return (
    <div className="shadow hover:shadow-lg rounded-md border border-gray-100 relative">
      <div className="divide-y space-y-2 bg-white">
        <h3 className="text-lg font-semibold pb-3 p-4">{classData?.name}</h3>
        <div className="p-4">
          <p className="text-sm text-gray-600 flex gap-2 items-start pt-1">
            <span className="flex items-center gap-1 font-semibold">
              <UserAddOutlined className="font-semibold" />
              <span>Instructor:</span>
            </span>
            <span>{classData?.instructor}</span>
          </p>
          <p className="text-sm text-gray-600 flex gap-2 items-start py-1">
            <span className="flex items-center gap-1 font-semibold">
              <FieldTimeOutlined className="font-semibold" />
              <span>Schedule:</span>
            </span>
            <span>{formattedSchedule}</span>
          </p>
        </div>
      </div>
      <div className="px-4 pb-4 flex justify-center">
        <Button
          type="primary"
          onClick={() => navigate(`/classes/${classData?.id}`)}
        >
          View Details
        </Button>
      </div>

      {/* Conditionally render edit and delete icons for non-members */}
      {profile?.length && profile[0]?.user?.user_type === "member" ? null : (
        <div className="absolute top-2 right-2 flex gap-2">
          <Button
            type="text"
            icon={
              <EditOutlined className="text-blue-500 hover:text-blue-700" />
            }
            onClick={handleEdit}
            className="text-blue-500 hover:text-blue-700"
          />
          <Button
            type="text"
            icon={<DeleteOutlined />}
            onClick={handleDelete}
            className="text-red-500 hover:text-red-700"
          />
        </div>
      )}

      {/* Edit Form Drawer */}
      <Drawer
        title="Edit Class"
        placement="right"
        onClose={() => setIsEditDrawerVisible(false)}
        visible={isEditDrawerVisible}
        width={500}
      >
        <Form
          name="editClass"
          initialValues={{
            name: classData?.name,
            instructor: classData?.instructor,
            schedule: formatScheduleForInput(classData?.schedule),
            description: classData?.description,
          }}
          onFinish={onEditFormFinish}
          onFinishFailed={onEditFormFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            name="name"
            rules={[
              { required: true, message: "Please enter the class name!" },
            ]}
          >
            <Input placeholder="Class Name" />
          </Form.Item>

          <Form.Item
            name="instructor"
            rules={[
              { required: true, message: "Please enter the instructor name!" },
            ]}
          >
            <Input placeholder="Instructor Name" />
          </Form.Item>

          <Form.Item
            name="schedule"
            rules={[{ required: true, message: "Please enter the schedule!" }]}
          >
            <Input type="datetime-local" />
          </Form.Item>

          <Form.Item
            name="description"
            rules={[
              { required: true, message: "Please enter the description!" },
            ]}
          >
            <Input.TextArea placeholder="Description" />
          </Form.Item>

          <Form.Item>
            <Button
              loading={editLoading}
              type="primary"
              htmlType="submit"
              block
            >
              Update Class
            </Button>
          </Form.Item>
        </Form>
      </Drawer>

      {/* Delete Confirmation Modal */}
      <Modal
        title="Confirm Delete"
        visible={isDeleteModalVisible}
        onOk={handleDeleteConfirm}
        onCancel={() => setIsDeleteModalVisible(false)}
        okText="Delete"
        okButtonProps={{ danger: true }}
        loading={deleteLoading}
      >
        <p>Are you sure you want to delete this class?</p>
      </Modal>
    </div>
  );
};

export default ClassCard;
