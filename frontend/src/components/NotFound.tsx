import WarningAmber from "@mui/icons-material/WarningAmber";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

type NotFoundProps = {
    text: string;
}

export default function NotFound(props: NotFoundProps) {
    const { text } = props;

    return (
        <Stack alignItems={'center'} spacing={1}>
            <WarningAmber />
            <Typography>
                {text}
            </Typography>
        </Stack>
    )
}