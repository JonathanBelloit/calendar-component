import { Box, Stack, Typography } from "@mui/material";
import { useState } from "react";
// react-icons imports
import { GrUserSettings } from "react-icons/gr";
import { RiShareBoxFill } from "react-icons/ri";
import { MdOutlineSettings } from "react-icons/md";
// local imports
import UserProfileModal from "../user/UserProfileModal";
import ShareCalendarModal from "../user/ShareCalendarModal";
import CalendarSettings from "./CalendarSettings";
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
  const [calendarSettingsOpen, setCalendarSettingsOpen] = useState<boolean>(false);

  return (
    <>
      <Stack direction="row" sx={{ pr: 3 }}>
        {userEmail && (
          <>
            <CalendarSettings
              setCalendarSettingsOpen={setCalendarSettingsOpen}
              calendarSettingsOpen={calendarSettingsOpen}
              userEmail={userEmail}
              />
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
          <MdOutlineSettings size={30} onClick={() => setCalendarSettingsOpen(true)} />
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
