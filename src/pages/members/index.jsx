import { Button, Modal, Spin } from "antd";
import {
  useDeleteMemberMutation,
  useEditProfileMutation,
  useMmeberListQuery,
} from "../../redux/features/auth/authApi";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const MembersPage = () => {
  const { data, isLoading: listLoading } = useMmeberListQuery();
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  console.log("🚀 ~ MembersPage ~ data:", data);

  // Handle View Modal
  const showViewModal = (member) => {
    setSelectedMember(member);
    setIsViewModalOpen(true);
  };

  const closeViewModal = () => {
    setIsViewModalOpen(false);
    setSelectedMember(null);
  };

  // Handle Delete Confirmation
  const showDeleteConfirm = (member) => {
    Modal.confirm({
      title: "Are you sure you want to delete this member?",
      content: `This action cannot be undone.`,
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: () => handleDelete(member),
    });
  };

  const [deleteMember, { isSuccess, isLoading, isError }] =
    useDeleteMemberMutation();
  const [
    editProfile,
    { isSuccess: editSuccess, isLoading: editLoading, isError: editError },
  ] = useEditProfileMutation();

  //   useEffect(() => {
  //     if (isLoading && (!isError || !isSuccess)) {
  //       toast.loading("Deleting member");
  //     }
  //   }, [isLoading]);
  useEffect(() => {
    if (isSuccess) {
      toast.success("Member deleted successfully");
    }
  }, [isSuccess]);
  useEffect(() => {
    if (isError) {
      toast.error("Failed to delete member");
    }
  }, [isError]);

  const handleDelete = async (member) => {
    console.log("Deleting member:", member);
    // Add your delete logic here
    try {
      await deleteMember(member?.id);
    } catch (error) {
      console.log("🚀 ~ handleDelete ~ error:", error);
      toast.error("Failed to delete member");
    }
  };

  // Handle Make Staff Confirmation
  const showMakeStaffConfirm = (member) => {
    Modal.confirm({
      title: "Are you sure you want to make this member a staff?",
      content: `This will grant them additional permissions.`,
      okText: "Make Staff",
      okType: "primary",
      cancelText: "Cancel",
      onOk: () => handleMakeStaff(member),
    });
  };

  useEffect(() => {
    if (editSuccess) {
      toast.success("Member updated successfully");
    }
  }, [editSuccess]);
  useEffect(() => {
    if (editError) {
      toast.error("Failed to update member");
    }
  }, [editError]);

  const handleMakeStaff = async (member) => {
    console.log("Making member a staff:", member);
    // Add your make staff logic here
    try {
      await editProfile({
        id: member?.id,
        userInfo: {
          userInfo: {
            user_type: "staff",
          },
        },
      });
    } catch (error) {
      console.log("🚀 ~ handleDelete ~ error:", error);
      toast.error("Failed to update member");
    }
  };

  return (
    <div className="min-h-screen py-16 pt-28 px-4 max-w-7xl mx-auto">
      <h5 className="text-xl font-semibold">Member List</h5>
      {listLoading ? (
        <div className=" flex items-center justify-center min-h-[50vh]">
          <Spin size="large" />
        </div>
      ) : (
        <div className="mt-10">
          {/* Header Row */}
          <div className="border-b border-gray-300 pb-2 hidden md:grid grid-cols-5 font-semibold gap-3 mb-3">
            <div>User Name</div>
            <div>Name</div>
            <div>Email</div>
            <div>User Type</div>
            <div>Action</div>
          </div>

          {/* Member List */}
          {data?.map((member, i) => (
            <div key={i} className="mb-2">
              <div className="border rounded-md border-gray-300 p-3 hover:bg-gray-200 grid grid-cols-1 md:grid-cols-5 gap-3">
                {/* User Name */}
                <div className="flex items-center">
                  <span className="mr-2">{i + 1}.</span>
                  <span className="truncate">{member?.username}</span>
                </div>

                {/* Name */}
                <div className="truncate">
                  {member?.first_name} {member?.last_name || ""}
                </div>

                {/* Email */}
                <div className="truncate" title={member?.email}>
                  {member?.email}
                </div>

                {/* User Type */}
                <div className="truncate">{member?.user_type}</div>

                {/* Action Buttons */}
                <div className="flex  gap-2 justify-start md:justify-end">
                  <Button type="default" onClick={() => showViewModal(member)}>
                    View
                  </Button>
                  {/* {member?.user_type === "member" ? (
                    <Button
                      type="primary"
                      className="bg-blue-500"
                      onClick={() => showMakeStaffConfirm(member)}
                    >
                      Make Staff
                    </Button>
                  ) : null} */}
                  <Button
                    type="primary"
                    danger
                    onClick={() => showDeleteConfirm(member)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* View Modal */}
      <Modal
        title="Member Details"
        open={isViewModalOpen}
        onCancel={closeViewModal}
        footer={[
          <Button key="close" onClick={closeViewModal}>
            Close
          </Button>,
        ]}
      >
        {selectedMember && (
          <div className="space-y-4">
            <div>
              <strong>Username:</strong> {selectedMember.username}
            </div>
            <div>
              <strong>Name:</strong> {selectedMember.first_name}{" "}
              {selectedMember.last_name || ""}
            </div>
            <div>
              <strong>Email:</strong> {selectedMember.email}
            </div>
            <div>
              <strong>User Type:</strong> {selectedMember.user_type}
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default MembersPage;
