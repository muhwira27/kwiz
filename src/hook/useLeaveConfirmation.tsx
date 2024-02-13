'use client';

import { useCallback, useState } from 'react';
import { useRouteChangeEvents } from 'nextjs-router-events';
import useBeforeUnload from './useBeforeUnload';
import ConfirmationModal from '@/components/ConfirmationModal';

const useLeaveConfirmation = (shouldPreventRouteChange: boolean) => {
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const onBeforeRouteChange = useCallback(() => {
    if (shouldPreventRouteChange) {
      setShowConfirmationModal(true);
      return false;
    }

    return true;
  }, [shouldPreventRouteChange]);

  const { allowRouteChange } = useRouteChangeEvents({ onBeforeRouteChange });
  useBeforeUnload(shouldPreventRouteChange);

  const handleCancel = () => {
    setShowConfirmationModal(false);
  };

  const handleConfirm = () => {
    allowRouteChange();
    setShowConfirmationModal(false);
  };

  return {
    confirmationModal: (
      <>
        {showConfirmationModal && (
          <ConfirmationModal onClose={handleCancel} onConfirm={handleConfirm} />
        )}
      </>
    ),
  };
};

export default useLeaveConfirmation;
