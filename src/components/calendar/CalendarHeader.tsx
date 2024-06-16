import { Box, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { GrUserSettings } from "react-icons/gr";
import { RiShareBoxFill } from "react-icons/ri";
import UserProfileModal from "../user/UserProfileModal";
import ShareCalendarModal from "../user/ShareCalendarModal";
import LogoutBtn from "../auth/LogoutBtn";

const CalendarHeader = ({
  userEmail,
  userFirstName,
}: {
  userEmail: string | null;
  userFirstName: string | undefined;
}) => {
  const [shareCalendarModalOpen, setShareCalendarModalOpen] =
    useState<boolean>(false);
  const [profileModalOpen, setProfileModalOpen] = useState<boolean>(false);

  return (
    <>
      <Stack direction="row" sx={{ pr: 3 }}>
        {userEmail && (
          <>
            <UserProfileModal
              setProfileModalOpen={setProfileModalOpen}
              profileModalOpen={profileModalOpen}
              userEmail={userEmail}
            />
            <ShareCalendarModal
              setShareCalendarModalOpen={setShareCalendarModalOpen}
              shareCalendarModalOpen={shareCalendarModalOpen}
              userEmail={userEmail}
            />
          </>
          )}
        <Box sx={{ display: "flex", flexGrow: 1 }}>
          <Typography variant="h4">
            {userFirstName ? userFirstName : userEmail}'s Calendar
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <RiShareBoxFill
            size={30}
            onClick={() => setShareCalendarModalOpen(true)}
          />
          <GrUserSettings size={30} onClick={() => setProfileModalOpen(true)} />
        </Box>
      </Stack>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', pr: 3 }}>
        <LogoutBtn />
      </Box>
    </>
  );
};

export default CalendarHeader;
