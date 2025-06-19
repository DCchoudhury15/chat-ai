import { ResponsiveDialog } from "@/components/responsive-dialog";
import { MeetingFrom } from "./meeting-form";
import { useRouter } from "next/navigation";

interface NewMeetingDialogProps{
    open: boolean;
    onOpenChange:(open:boolean)=> void;
};

export const NewMeetingDialog=({
    open,
    onOpenChange,
}:NewMeetingDialogProps)=>{
    const router = useRouter();
    return(
        <ResponsiveDialog
        title="New Meeting"
        description="Create a new meeting"
        open={open}
        onOpenChange={onOpenChange}
        >
   
<MeetingFrom
            onSuccess={(id) => {
                onOpenChange(false);
                router.push(`/meetings/${id}`);
            }}
            onCancel={() => 
                onOpenChange(false)
            }/>
        </ResponsiveDialog>
    )
}