import Swal from "sweetalert2";

const useSwal = () => {
  const Success = ({ title }) => {
    Swal.fire({
      position: "top",
      icon: "success",
      title: title,
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

  // const Delete = ({ name, method, id }) => {
  //   Swal.fire({
  //     title: `Bạn có chắc muốn xoá ${name} này không?`,
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Xoá bỏ!",
  //     cancelButtonText: "Huỷ bỏ",
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       method(id);
  //       Swal.fire("Đã xoá!", `${name} của bạn đã bị xóa.`, "success");
  //       window.location.reload();
  //     }
  //   });
  // };

  return { Success, Error };
};

export default useSwal;
