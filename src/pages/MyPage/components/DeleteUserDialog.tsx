import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  // DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

const DeleteUserDialog = ({
  onDelete,
  open,
  onOpenChange,
}: {
  onDelete: () => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) => (
  <Dialog open={open} onOpenChange={onOpenChange}>
    {/* <DialogTrigger asChild>
      <button className="w-full bg-gray-scale-100 py-3 text-body1 text-gray-scale-200 rounded-lg">
        회원탈퇴
      </button>
    </DialogTrigger> */}
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>
          <div className="w-full flex justify-center pt-6 mb-4">
            <div className="w-28 h-28 text-title text-red-500 bg-red-100 rounded-full flex items-center justify-center">
              !
            </div>
          </div>
        </DialogTitle>
        <DialogDescription>
          <p className="text-center text-body1 mb-3">정말로 회원탈퇴 하시겠습니까?</p>
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <button
          onClick={onDelete}
          className="w-24 bg-gray-scale-100 py-2 text-sub-body1 text-gray-scale-400 rounded-lg"
        >
          네
        </button>
        <DialogClose className="w-24 bg-gray-scale-200 py-2 text-sub-body1 text-gray-scale-0 rounded-lg">
          아니오
        </DialogClose>
      </DialogFooter>
    </DialogContent>
  </Dialog>
);

export default DeleteUserDialog;
