import Error from "@mui/icons-material/Error";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

type ErrorPageProps = {
    text: string;
}

export default function ErrorPage(props: ErrorPageProps) {
    const { text } = props;

    return (
        <Stack alignItems={'center'} spacing={1}>
            <Error color="error" />
            <Typography>
                {text}
            </Typography>
        </Stack>
    )
}