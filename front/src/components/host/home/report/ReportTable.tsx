import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { createTheme, ThemeProvider } from "@mui/material/styles";

interface Props {
  property: string[];
  data: {
    rank?: number;
    nickName?: string;
    successRate?: number;
    totalScore?: number;
    id?: number;
    title?: string;
    problem?: string;
  }[];
  type: string;
}

interface PaletteColor {
  light?: string;
  main: string;
  dark?: string;
  contrastText?: string;
}

declare module "@mui/material/styles" {
  interface Palette {
    custom?: {
      light: string;
      main: string;
      dark: string;
      contrastText: string;
    };
  }
  interface PaletteOptions {
    custom?: {
      light: string;
      main: string;
      dark: string;
      contrastText: string;
    };
  }
}
const theme = createTheme({
  palette: {
    custom: {
      light: "#ffa726",
      main: "#DAD2FF",
      dark: "#ef6c00",
      contrastText: "rgba(0, 0, 0, 0.87)",
    },
  },
  typography: {
    fontFamily: "GodoM",
  },
});

const ReportTable = (props: Props) => {
  const { property, data, type } = props;
  // property : 상단 헤더에 고정될 속성이름 배열
  // data : 각 인스턴스 객체형식 배열
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: type === "part" ? theme.palette.custom?.main : "#fad25a",
      color: theme.palette.common.black,
      fontSize: 18,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 16,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(even)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  return (
    <ThemeProvider theme={theme}>
      <TableContainer
        sx={{
          "&::-webkit-scrollbar": {
            width: 3,
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: type === "part"? "rgb(179, 178, 233)" : "#fad25a57",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: type === "part" ? "rgb(134, 133, 229)" : "#ffe28a4a",
            borderRadius: 0,
          },
          overflowX: "hidden",
        }}
        component={Paper}
      >
        <Table sx={{ minWidth: 700, borderRadius: "20px" }} aria-label="customized table" stickyHeader>
          <TableHead>
            <TableRow>
              {property && property.map((col, index) => (
                <StyledTableCell align="center" key={index}>
                  {col}
                </StyledTableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody style={{ overflow: "auto" }}>
            {data && data.map((row, index) => (
              <StyledTableRow key={index}>
                {Object.values(row).map((r, index) => (
                  <StyledTableCell align="center" key={index}>
                    {r}
                  </StyledTableCell>
                ))}
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </ThemeProvider>
  );
};

export default ReportTable;
