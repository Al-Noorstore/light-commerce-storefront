
import { useState } from 'react';

export const useSavePassword = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);
  const [dialogConfig, setDialogConfig] = useState({
    title: 'Confirm Changes',
    description: 'Please enter your save password to confirm these changes.'
  });

  const requestSaveConfirmation = (
    action: () => void,
    title: string = 'Confirm Changes',
    description: string = 'Please enter your save password to confirm these changes.'
  ) => {
    setPendingAction(() => action);
    setDialogConfig({ title, description });
    setIsDialogOpen(true);
  };

  const handleConfirm = () => {
    if (pendingAction) {
      pendingAction();
      setPendingAction(null);
    }
  };

  const handleClose = () => {
    setIsDialogOpen(false);
    setPendingAction(null);
  };

  return {
    isDialogOpen,
    dialogConfig,
    requestSaveConfirmation,
    handleConfirm,
    handleClose
  };
};
