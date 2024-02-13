import React from 'react';
import { QuestionMarkRounded } from '@mui/icons-material';

export default function ConfirmationModal({
  onClose,
  onConfirm,
}: {
  onClose: () => void;
  onConfirm: () => void;
}) {
  return (
    <section className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-50">
      <div className="flex w-[85%] max-w-96 flex-col items-center justify-center gap-12 rounded-large bg-white pb-6 pt-16 shadow-lg sm:w-2/3 md:gap-14 lg:px-2">
        <div className="flex flex-col items-center gap-12 px-16 md:gap-14">
          <div className="flex h-[75px] w-[75px] items-center justify-center rounded-full bg-[#4B5548] shadow-2xl md:h-[88px] md:w-[88px]">
            <QuestionMarkRounded
              className="text-white"
              sx={{ fontSize: { xs: 36, md: 40, lg: 40 } }}
            />
          </div>
          <p className="text-center text-sm font-medium leading-relaxed tracking-wide text-charcoal md:text-base md:tracking-wider">
            Are you sure you want to leave the Quiz?
          </p>
        </div>

        <div className="flex justify-center gap-4">
          <button
            className="rounded-2xl bg-transparent px-11 py-3 text-sm font-bold hover:bg-[#B2BEB5] hover:text-white md:px-14 md:py-3 md:text-base"
            onClick={onClose}
          >
            No
          </button>
          <button
            className="rounded-2xl bg-transparent px-11 py-3 text-sm font-bold hover:bg-[#F42020] hover:bg-opacity-60 hover:text-white md:px-14 md:py-5 md:text-base"
            onClick={onConfirm}
          >
            Yes
          </button>
        </div>
      </div>
    </section>
  );
}
