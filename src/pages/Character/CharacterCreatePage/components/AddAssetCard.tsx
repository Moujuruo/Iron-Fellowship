import { Card, CardActionArea, Grid, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/AddCircle";

interface AddAssetCardProps {
  onClick: () => void;
}

export function AddAssetCard(props: AddAssetCardProps) {
  const { onClick } = props;

  return (
    <Card
      sx={{
        minHeight: 450,
        width: "100%",
      }}
      variant={"outlined"}
    >
      <CardActionArea
        onClick={onClick}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          height: "100%",
          backgroundColor: "theme.palette.background.paper"
        }}
      >
        <Typography variant={"h6"}
          sx={(theme) => (
            {
              color: theme.palette.primary.contrastText,
            })}
        >
          {/* should modify */}
          Add Asset
        </Typography>
        <AddIcon
          sx={(theme) => ({
            color: theme.palette.grey[400],
            width: 32,
            height: 32,
          })}
        />
      </CardActionArea>
    </Card>
  );
}
