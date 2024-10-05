import { Container, Link, ListItem, ListItemText, Typography } from "@mui/material";
import { Submission } from "../utils/types"

type SubmissionsListItemProps = {
    submission: Submission
}

export default function SubmissionsListItem(props: SubmissionsListItemProps) {
    const { submission } = props;

    return (
        <ListItem
            component={Link}
            href={`/view-forms/${submission.id}`}
            alignItems="flex-start"
            sx={{
                flexDirection: 'column',
                padding: '1rem'
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