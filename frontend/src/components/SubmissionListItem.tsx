import ListItem from "@mui/material/ListItem";
import { Submission } from "../utils/types"
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";

type SubmissionsListItemProps = {
    submission: Submission
}

export default function SubmissionsListItem(props: SubmissionsListItemProps) {
    const { submission } = props;

    return (
        <ListItem
            component={Link}
            to={`/view-forms/${submission.id}`}
            alignItems="flex-start"
            sx={{
                textDecoration: 'none',
                flexDirection: 'column',
                padding: '1rem',
                transition: 'all 0.25s',
                ':hover': {
                    backgroundColor: 'primary.main'
                }
            }}>
            <Typography variant="h5" component={"h2"}>
                {submission.form.name}
            </Typography>
            <Container disableGutters>
                <Typography>
                    Potilas: {submission.submitterName}
                </Typography>
                <Typography>
                    Yhteispisteet: {submission.score}
                </Typography>
            </Container>
        </ListItem>
    )
}