import { Outlet, useNavigate } from 'react-router-dom'; //
import useUserStore from '../store/store';
import Modal from '../pages/modal/Modal';
import { useState } from 'react';

const ProtectedRoute = () => {
  const { isLoggedIn } = useUserStore();
  const [isModalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  if (!isLoggedIn) {
    setTimeout(() => setModalOpen(true), 0);

    const handleLoginRedirect = () => {
      setModalOpen(false);
      navigate('/login');
    };

    const handleClose = () => {
      setModalOpen(false);
      navigate(-1);
    };

    return (
      <>
        <Modal isOpen={isModalOpen} onClose={handleClose} title="알림">
          <p className="h-3/4 flex py-3">로그인이 필요한 페이지입니다.</p>
          <div className="flex justify-end space-x-4 mt-4">
            <button
              onClick={handleLoginRedirect}
              className="px-4 py-2 w-full rounded bg-blue-500 text-white hover:bg-blue-700"
            >
              로그인 페이지로 이동
            </button>
          </div>
        </Modal>
      </>
    );
  }

  return <Outlet />;
};

export default ProtectedRoute;
