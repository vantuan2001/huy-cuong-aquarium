import Swal from "sweetalert2";

const useSwal = () => {
  const AddToCart = ({ title }) => {
    Swal.fire({
      position: "top-end",
      title: title,
      showConfirmButton: false,
      timer: 1500,
      height: 40,
    });
  };

  const Success = ({ title }) => {
    const Toast = Swal.mixin({
      toast: true,
      width: "max-content",
      position: "top",
      showConfirmButton: false,
      timer: 3000,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });

    Toast.fire({
      icon: "success",
      title: title,
    });
  };

  const ToastSuccess = ({ title }) => {
    Swal.fire({
      position: "top",
      icon: "success",
      title: "Thành công",
      text: `${title} thành công`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const Error = ({ title }) => {
    const Toast = Swal.mixin({
      toast: true,
      width: "max-content",
      position: "top",
      showConfirmButton: false,
      timer: 3000,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    });

    Toast.fire({
      icon: "error",
      title: title,
    });
  };

  const ToastDelete = async ({ name, method, id, cancel }) => {
    const result = await Swal.fire({
      title: `Bạn có chắc chắn muốn ${name} này không?`,
      text: "Dữ liệu này không thể khôi phục",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: !cancel ? "Xoá bỏ!" : "Huỷ đơn hàng",
      cancelButtonText: "Huỷ bỏ",
    });

    if (result.isConfirmed) {
      try {
        await method({ id });
        Swal.fire({
          title: "Thành công",
          text: `${name} thành công`,
          icon: "success",
        });
      } catch (error) {
        Swal.fire("Lỗi!", `Không thể xóa ${name}.`, "error");
        console.error("Error deleting item:", error);
      }
    }
  };

  return { AddToCart, Success, ToastSuccess, Error, ToastDelete };
};

export default useSwal;
