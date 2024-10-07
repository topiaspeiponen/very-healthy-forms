
import Paper from "@mui/material/Paper";
import { Submission } from "../utils/types"
import SubmissionsListItem from "./SubmissionListItem";
import ArrowBack from "@mui/icons-material/ArrowBack";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import WarningAmber from "@mui/icons-material/WarningAmber";
import Divider from "@mui/material/Divider";
import ErrorOutline from "@mui/icons-material/ErrorOutline";

type SubmissionsListProps = {
    submissions: Submission[],
    fetchError: boolean
}

export default function SubmissionsList(props: SubmissionsListProps) {
    const { submissions, fetchError } = props;

    return (
        <Paper
            sx={{
                padding: '2rem',
                minWidth: {
                    xs: 'auto',
                    md: '500px',
                    lg: '750px'
                }
            }}
        >

            <IconButton
                component={Link}
                sx={{ padding: 0, marginBottom: '1rem' }}
                color="primary"
                to="/">
                <ArrowBack />
            </IconButton>
            <Typography sx={{ marginBottom: '1rem' }} variant="h3" component={"h1"}>
                Täytetyt kyselyt
            </Typography>
            <Divider />
            {submissions.length > 0 ? (
                <List sx={{
                    marginTop: '2rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1.5rem',
                    paddingLeft: '0.5rem',
                    paddingRight: '1rem',
                    maxHeight: '70vh',
                    overflowY: 'auto'
                }}>
                    {submissions.map(submission => {
                        return (
                            <Paper key={submission.id} elevation={4}>
                                <SubmissionsListItem key={submission.id} submission={submission} />
                            </Paper>
                        )
                    })}
                </List>
            ) : (
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    margin: '4rem 0'
                }}
                >
                    {fetchError ? (
                        <>
                            <ErrorOutline sx={{ width: '100%' }} color="primary" />
                            <Typography>
                                Virhe täytettyjen kyselyeiden haussa.
                                Kokeile hetken päästä uudelleen.
                            </Typography>
                        </>
                    ) : (
                        <>
                            <WarningAmber sx={{ width: '100%' }} color="primary" />
                            <Typography>
                                Täytettyjä kyselyitä ei löytynyt.
                            </Typography>
                        </>
                    )}
                </Box>
            )}
        </Paper>
    )
}