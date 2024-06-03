import { Box, Grid } from "@mui/material";
import { TbSquareRoundedArrowLeftFilled } from "react-icons/tb";
import { TbSquareRoundedArrowRightFilled } from "react-icons/tb";

const Calendar = () => {
  return (
    <>
      <Grid container spacing={5} sx={{ backgroundColor: 'blue', minHeight: '100vh', p: 1, gap: 1, height: '100vh', display: 'flex', flexGrow: 1 }}> {/* Main wrapper */}
        <Grid item xs={6.5} sx={{ flexGrow: 1, backgroundColor: 'blue' }}> {/* Calendar wrapper */}
          <h1>Jon's Calendar</h1>
          <Box sx={styles.dateNavigationWrapper}> {/* Calendar Date Navigation */}
            <TbSquareRoundedArrowLeftFilled />
              <Box sx={styles.monthYearNav}>
                <h2>June</h2>
                <h2>2024</h2>
              </Box>
            <TbSquareRoundedArrowRightFilled />
          </Box>
          
            <Box sx={styles.dateGridWrapper}>
              <Grid container spacing={0} columns={7}>
                <Grid item xs={1} sx={styles.dayGridTitle}>S</Grid>
                <Grid item xs={1} sx={styles.dayGridTitle}>M</Grid>
                <Grid item xs={1} sx={styles.dayGridTitle}>T</Grid>
                <Grid item xs={1} sx={styles.dayGridTitle}>W</Grid>
                <Grid item xs={1} sx={styles.dayGridTitle}>H</Grid>
                <Grid item xs={1} sx={styles.dayGridTitle}>F</Grid>
                <Grid item xs={1} sx={styles.dayGridTitle}>S</Grid>
              </Grid>
              
              <Grid container spacing={0} columns={7}> {/* Calendar Date Grid */}
                <Grid xs={1} sx={styles.dayGrid}>1</Grid>
                <Grid xs={1} sx={styles.dayGrid}>2</Grid>
                <Grid xs={1} sx={styles.dayGrid}>3</Grid>
                <Grid xs={1} sx={styles.dayGrid}>4</Grid>
                <Grid xs={1} sx={styles.dayGrid}>5</Grid>
                <Grid xs={1} sx={styles.dayGrid}>6</Grid>
                <Grid xs={1} sx={styles.dayGrid}>7</Grid>
                <Grid xs={1} sx={styles.dayGrid}>8</Grid>
                <Grid xs={1} sx={styles.dayGrid}>9</Grid>
                <Grid xs={1} sx={styles.dayGrid}>10</Grid>
                <Grid xs={1} sx={styles.dayGrid}>11</Grid>
                <Grid xs={1} sx={styles.dayGrid}>12</Grid>
                <Grid xs={1} sx={styles.dayGrid}>13</Grid>
                <Grid xs={1} sx={styles.dayGrid}>14</Grid>
                <Grid xs={1} sx={styles.dayGrid}>15</Grid>
                <Grid xs={1} sx={styles.dayGrid}>16</Grid>
                <Grid xs={1} sx={styles.dayGrid}>17</Grid>
                <Grid xs={1} sx={styles.dayGrid}>18</Grid>
                <Grid xs={1} sx={styles.dayGrid}>19</Grid>
                <Grid xs={1} sx={styles.dayGrid}>20</Grid>
                <Grid xs={1} sx={styles.dayGrid}>21</Grid>
                <Grid xs={1} sx={styles.dayGrid}>22</Grid>
                <Grid xs={1} sx={styles.dayGrid}>23</Grid>
                <Grid xs={1} sx={styles.dayGrid}>24</Grid>
                <Grid xs={1} sx={styles.dayGrid}>25</Grid>
                <Grid xs={1} sx={styles.dayGrid}>26</Grid>
                <Grid xs={1} sx={styles.dayGrid}>27</Grid>
                <Grid xs={1} sx={styles.dayGrid}>28</Grid>
                <Grid xs={1} sx={styles.dayGrid}>29</Grid>
                <Grid xs={1} sx={styles.dayGrid}>30</Grid>
                <Grid xs={1} sx={styles.dayGrid}>31</Grid>
              </Grid>
            </Box>
        </Grid>
        <Grid item xs={5} sx={styles.eventGrid}>
          <Box>
            <h1>Today's Events</h1>
          </Box>
          <Box>
            <h1>Events this Month</h1>
          </Box>
        </Grid>
      </Grid>
    </>
  )
}

export default Calendar

const styles = {
  dateNavigationWrapper: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  monthYearNav: {
    display: 'flex',
    flexDirection: 'row',
    gap: 2
  },
  dateGridWrapper: {
    display: "flex",
    flexDirection: "column",
    alignItems: 'center',
    justifyContent: "center",
    justifyItems: "center",
    border: '1px solid black',
    borderRadius: '2rem',
    // gap: 1,
    width: "100%",
  },
  dayGridTitle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '4rem',
    fontWeight: 'bold',
    fontSize: '1.5rem',
  },
  dayGrid: {
    display: 'flex',
    border: '1px solid black',
    alignItems: 'center',
    justifyContent: 'center',
    height: '4rem'
  },
  eventGrid: {
    p: 5,
    border: '1px solid black',
  }
}