
import Paper from "@mui/material/Paper";
import { Submission } from "../utils/types"
import SubmissionsListItem from "./SubmissionListItem";
import ArrowBack from "@mui/icons-material/ArrowBack";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import { Link } from "react-router-dom";

type SubmissionsListProps = {
    submissions: Submission[]
}

export default function SubmissionsList(props: SubmissionsListProps) {
    const { submissions } = props;

    if (submissions.length > 0) {
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
                sx={{ padding: 0, marginBottom: '1rem'}}
                color="primary"
                to="/">
                <ArrowBack />
            </IconButton>
                <Typography variant="h3" component={"h1"}>
                    Täytetyt kyselyt
                </Typography>
                <List sx={{
                        marginTop: '2rem',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1.5rem',
                        paddingLeft: '0.5rem',
                        paddingRight: '1rem',
                        maxHeight: '70vh',
                        overFlowY: 'auto'
                    }}>
                    {submissions.map(submission => {
                        return (
                            <Paper elevation={4}>
                                <SubmissionsListItem key={submission.id} submission={submission} />
                            </Paper>
                        )
                    })}
                </List>
            </Paper>
        )
    }
    return (
        <Paper>
            Täytettyjä lomakkeita ei löytynyt
        </Paper>
    )
}