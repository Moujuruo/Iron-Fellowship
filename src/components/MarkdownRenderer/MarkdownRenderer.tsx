import { Box, Link, Typography } from "@mui/material";
import { useLinkedDialog } from "providers/LinkedDialogProvider";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export interface MarkdownRendererProps {
  inlineParagraph?: boolean;
  markdown: string;
  inheritColor?: boolean;
  disableLinks?: boolean;
}

export function MarkdownRenderer(props: MarkdownRendererProps) {
  const { inlineParagraph, markdown, inheritColor, disableLinks } = props;

  const { openDialog } = useLinkedDialog();

  return (
    <ReactMarkdown
      children={markdown}
      remarkPlugins={[remarkGfm]}
      components={{
        
        p: ({ children }) => (
          <Typography
            variant={"body2"}
            display={inlineParagraph ? "inline" : "block"}
            // color={
            //   inheritColor
            //     ? "inherit"
            //     : (theme) =>
            //         inlineParagraph
            //           ? theme.palette.text.secondary
            //           : theme.palette.text.primary
            // }
            color={(theme) => theme.palette.primary.contrastText}
            py={inlineParagraph ? 0 : 1}
            textAlign={"left"}
          >
            {children}
          </Typography>
        ),
        
        li: ({ children }) => (
          <Typography
            component={"li"}
            variant={"body2"}
            // color={
            //   inheritColor
            //     ? "inherit"
            //     : (theme) =>
            //         inlineParagraph
            //           ? theme.palette.text.secondary
            //           : theme.palette.text.primary
            // }
            color={(theme) => theme.palette.primary.contrastText}
          >
            {children}
          </Typography>
        ),
        
        ul: ({ children }) => (
          <Box component={"ul"} pl={1.5} color={(theme) => theme.palette.primary.contrastText}> 
            {children}
          </Box>
        ),
        table: ({ children }) => (
          <Box
            component={"table"}
            mt={2}
            mb={1}
            border={1}
            borderColor={(theme) => theme.palette.divider}
            borderRadius={(theme) => theme.shape.borderRadius}
            sx={{ borderCollapse: "collapse"}}
          >
            {children}
          </Box>
        ),
        thead: ({ children }) => (
          <Box component={"thead"} bgcolor={(theme) => theme.palette.grey[200]}>
            {children}
          </Box>
        ),
        th: ({ children }) => (
          <Typography
            component={"th"}
            variant={"body2"}
            textAlign={"left"}
            p={1}
            minWidth={"8ch"}
          >
            <b>{children}</b>
          </Typography>
        ),
        tr: ({ children }) => (
          <Box
            component={"tr"}
            sx={(theme) => ({
              "&:nth-of-type(even)": {
                backgroundColor: theme.palette.grey[100],
              },
            })}
          >
            {children}
          </Box>
        ),
        td: ({ children }) => (
          <Typography
            component={"td"}
            px={1}
            py={0.5}
            variant={"body2"}
            color={(theme) => theme.palette.grey[700]}
          >
            {children}
          </Typography>
        ),
        a: (props) => {
          if (disableLinks) {
            return <>{props.children}</>;
          }
          const href = props.href ?? "";
          if (href.startsWith("ironsworn/") || href.startsWith("starforged/")) {
            if (
              href.startsWith("ironsworn/moves") ||
              href.startsWith("ironsworn/oracles")
            ) {
              return (
                <Link
                  component={"button"}
                  sx={{ cursor: "pointer", verticalAlign: "baseline" }}
                  color={"info.dark"}
                  onClick={() => openDialog(href)}
                >
                  {props.children}
                </Link>
              );
            }
            // TODO - add handlers for this situation;
            return <span>{props.children}</span>;
          }
          return <a {...props} />;
        },
      }}
    />
  );
}
