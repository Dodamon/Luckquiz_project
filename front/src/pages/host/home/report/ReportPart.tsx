import { useParams } from "react-router-dom";
import styles from "./Report.module.css";
import ReportTab from "components/host/home/report/ReportTab";
import { Icon } from "@iconify/react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const parti = {
  title: "SSAFY 스타트 캠프 퀴즈",
  list: [
    {
      rank: 1,
      name: "체고두뇌 이예진",
      answer: 99.9,
      score: 999,
    },
    {
      rank: 2,
      name: "체고두뇌 서유진",
      answer: 99,
      score: 998,
    },
    {
      rank: 3,
      name: "체고두뇌 예니옌",
      answer: 99,
      score: 998,
    },
  ],
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const ReportPart = () => {
  const { report_id } = useParams();
  return (
    <div className={`${styles[`content`]}`}>
      <div className={`${styles[`title`]}`}>{parti.title}</div>
      <ReportTab report_id={report_id}></ReportTab>
      <div className={`${styles[`report-content`]}`} style={{ backgroundColor: "var(--point-color)" }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Dessert (100g serving)</StyledTableCell>
                <StyledTableCell align="right">Calories</StyledTableCell>
                <StyledTableCell align="right">Fat&nbsp;(g)</StyledTableCell>
                <StyledTableCell align="right">Carbs&nbsp;(g)</StyledTableCell>
                <StyledTableCell align="right">Protein&nbsp;(g)</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {parti.list.map((row) => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell component="th" scope="row">
                    {row.name}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.rank}</StyledTableCell>
                  <StyledTableCell align="right">{row.name}</StyledTableCell>
                  <StyledTableCell align="right">{row.answer}</StyledTableCell>
                  <StyledTableCell align="right">{row.score}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};

export default ReportPart;
