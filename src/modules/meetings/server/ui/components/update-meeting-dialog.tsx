import { ResponsiveDialog } from "@/components/responsive-dialog";
import { MeetingFrom } from "./meeting-form";
import { MeetingGetOne } from "@/modules/meetings/types";

interface UpdateMeetingDialogProps{
    open: boolean;
    onOpenChange:(open:boolean)=> void;
    initialValues: MeetingGetOne
};

export const UpdateMeetingDialog=({
    open,
    onOpenChange,
    initialValues,
}:UpdateMeetingDialogProps)=>{
    
    return(
        <ResponsiveDialog
        title="Edit Meeting"
        description="Edit the meeting details"
        open={open}
        onOpenChange={onOpenChange}
        >
   
<MeetingFrom
            onSuccess={() => 
                onOpenChange(false)}
            onCancel={() => onOpenChange(false)}
                initialValues={initialValues}
        />
        </ResponsiveDialog>
    )
}