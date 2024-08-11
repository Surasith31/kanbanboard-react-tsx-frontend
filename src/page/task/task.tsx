import { useEffect, useState } from "react";
import { useDrop, DndProvider, useDrag } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import AppbarPage from "../../component/appbar/appbar";
import EditIcon from "@mui/icons-material/Edit";
import { columnService } from "../../service/columnService";
import { task, columnGetRequst } from "../../model/columnGetRequest";
import { taskService } from "../../service/taskService";
interface InnerCardItem {
  id: number;
  name: string; // ตรวจสอบว่ามีการกำหนด `name` ในที่นี้
}
interface CardItem {
  id: number;
  name: string;
  innerCards: InnerCardItem[];
  boards: task[]; // เปลี่ยนเป็น array ของ board
}
const ItemType = {
  INNER_CARD: "innerCard",
};
interface TaskCardProps {
  board: task;
  columnId: number;
  moveTask: (taskId: number, fromColumnId: number, toColumnId: number) => void;
  deleteTask: (taskId: number) => void;
}
interface DialogProps {
  open: boolean;
  onClose: () => void;
  cardid?: number;
  getAllcolumn?: any;
  taskid?: number;
  refreshTasks: () => void; // ฟังก์ชันรีเฟรชข้อมูล
}
interface OuterCardProps {
  card: CardItem; // รับ CardItem เป็น prop
}

//เเก้ไขชื่อ
function EditNameColumn({ open, onClose, cardid, getAllcolumn }: DialogProps) {
  const [columnname, setColumnName] = useState("");
  const columnservice = new columnService();
  //ดึงserviceมาใช้
  async function EditNameColumn() {
    const body = {
      name: columnname,
    };
    try {
      await columnservice.EditNameColumn(Number(cardid), body);
      alert("เเก้ไขสำเร็จ");
      onClose();
      getAllcolumn();
    } catch (error) {}
  }
  //ดึงข้อมูลcolumn
  async function Loaddata(cardid: number) {
    const res = await columnservice.getColumnbyid(cardid);
    setColumnName(res[0].name);
  }
  useEffect(() => {
    if (cardid) {
      Loaddata(cardid);
    }
  }, [cardid]);
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"เเก้ไขชื่อ Column"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <TextField
            type="text"
            value={columnname}
            onChange={(e) => {
              setColumnName(e.target.value);
            }}
          ></TextField>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            EditNameColumn();
          }}
          variant="contained"
          color="success"
        >
          ตกลง
        </Button>
        <Button onClick={onClose} variant="contained" color="error">
          ยกเลิก
        </Button>
      </DialogActions>
    </Dialog>
  );
}
//เเก้ไขชื่อ task
function EditNameTask({ open, onClose, taskid, refreshTasks }: DialogProps) {
  const [taskname, setTaskname] = useState("");
  const taskservice = new taskService();
  //ดึงserviceมาใช้
  async function EditNameColumn() {
    const body = {
      name: taskname,
    };
    try {
      await taskservice.EditNametask(Number(taskid), body);
      alert("เเก้ไขสำเร็จ");
      onClose();
      refreshTasks();
    } catch (error) {
      console.log(error);
    }
  }
  //ดึงข้อมูลtask
  async function Loaddata() {
    const res = await taskservice.getBoardbyid(Number(taskid));
    setTaskname(res[0].name);
  }
  useEffect(() => {
    if (taskid) {
      Loaddata();
    }
  }, [taskid]);
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"เเก้ไขชื่อ Task"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <TextField
            type="text"
            value={taskname}
            onChange={(e) => {
              setTaskname(e.target.value);
            }}
          ></TextField>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            EditNameColumn();
          }}
          variant="contained"
          color="success"
        >
          ตกลง
        </Button>
        <Button onClick={onClose} variant="contained" color="error">
          ยกเลิก
        </Button>
      </DialogActions>
    </Dialog>
  );
}
function TaskPage() {
  const [taskByColumn, settaskByColumn] = useState<{
    [key: number]: task[];
  }>({});
  const [nextColumnNumber, setNextColumnNumber] = useState(1);
  const [column, setColumn] = useState<columnGetRequst[]>([]);

  const userID = localStorage.getItem("objUser");
  const user = userID ? Number(userID) : null;

  const [cardid, setCardid] = useState<number>();
  const [taskid, setTaskid] = useState<number>();
  const columnservice = new columnService();
  const taskservice = new taskService();

  const [openedit, setOpenedit] = useState(false);
  const [openedit2, setOpenedit2] = useState(false);
  const ClickOpenEdit = (id: number) => {
    setCardid(id);
    setOpenedit(true);
  };
  const CloseEdit = () => {
    setOpenedit(false);
  };

  const ClickOpenEdittask = (id: Number) => {
    setTaskid(Number(id));
    setOpenedit2(true);
  };
  const CloseEdittask = () => {
    setOpenedit2(false);
  };
  //ดึงข้อมูลcolumnมาโชว์ทั้งหมด
  async function getAllcolumn() {
    try {
      const res = await columnservice.getColumnAllByid(Number(user));
      setColumn(res);
    } catch (error) {
      console.log(error);
    }
  }
  //เพิ่ม column
  async function AddColumn() {
    const body = {
      name: `Name ${nextColumnNumber}`, // ตั้งชื่อด้วยหมายเลขปัจจุบัน
      uid: Number(user),
    };
    try {
      await columnservice.PostColumnByid(body);
      setNextColumnNumber(nextColumnNumber + 1); // เพิ่มหมายเลขสำหรับคอลัมน์ถัดไป
      getAllcolumn();
    } catch (error) {
      console.log(error);
    }
  }
  //ลบColumn
  async function DeleteColumn(id: number) {
    try {
      await columnservice.DeleteColumn(id);
      alert("ลบColumnเรียบร้อย");
      getAllcolumn();
    } catch (error) {}
  }

  //เพิ่ม task ใน column
  async function AddTask(id: number) {
    const body = {
      name: `Name ${nextColumnNumber}`,
      cid: id,
    };
    try {
      await taskservice.PostBoardByid(body);
      setNextColumnNumber(nextColumnNumber + 1);
      // รีเฟรชข้อมูล boards
      const updatedBoards = await getAllBoardsByColumn(column); // เรียกใช้ getAllBoardsByColumn เพื่อดึงข้อมูล boards ใหม่
      settaskByColumn(updatedBoards); // อัปเดต state ของ boardsByColumn
    } catch (error) {
      console.log(error);
    }
  }
  //ลบtask
  async function DeleteTask(id: number) {
    try {
      await taskservice.DeleteBoard(id);
      alert("ลบTaskสำเร็จ");
      const updatedBoards = await getAllBoardsByColumn(column); // เรียกใช้ getAllBoardsByColumn เพื่อดึงข้อมูล boards ใหม่
      settaskByColumn(updatedBoards); // อัปเดต state ของ boardsByColumn
    } catch (error) {
      console.log(error);
    }
  }
  // ฟังก์ชันที่ดึงข้อมูล boards สำหรับแต่ละ column
  async function getAllBoardsByColumn(
    columns: columnGetRequst[]
  ): Promise<{ [key: number]: task[] }> {
    const boardsByColumn: { [key: number]: task[] } = {};
    for (const column of columns) {
      try {
        const res = await taskservice.getBoardAllByid(column.id);
        boardsByColumn[column.id] = res;
      } catch (error) {
        console.log("Error fetching boards:", error);
      }
    }
    return boardsByColumn;
  }
  const refreshTasks = async () => {
    const updatedBoards = await getAllBoardsByColumn(column);
    settaskByColumn(updatedBoards);
  };
  // useEffect ที่ใช้สำหรับดึงข้อมูล columns และ boards
  useEffect(() => {
    async function fetchData() {
      const columnData = await columnservice.getColumnAllByid(Number(user));
      setColumn(columnData);

      const boardsByColumn = await getAllBoardsByColumn(columnData);
      settaskByColumn(boardsByColumn);
    }
    fetchData();
  }, []);
  useEffect(() => {
    getAllcolumn();
  }, []); // ทำงานเพียงครั้งเดียวเมื่อคอมโพเนนต์ถูกโหลด

  const OuterCard: React.FC<OuterCardProps> = ({ card }) => {
    const [, drop] = useDrop(() => ({
      accept: ItemType.INNER_CARD,
    }));

    async function MoveTask(innerCardId: number, toCardId: number) {
      try {
        await taskservice.Movetask(innerCardId, { cid: toCardId });
        console.log(innerCardId, toCardId);

        // รีเฟรชข้อมูลหลังจากย้าย
        const updatedBoards = await getAllBoardsByColumn(column);
        console.log("Updated Boards:", updatedBoards);
        settaskByColumn(updatedBoards);
      } catch (error) {
        console.log("Error moving task:", error);
      }
    }

    return (
      <Card ref={drop} className="st-card" sx={{ borderRadius: "20px" }}>
        <CardHeader
          sx={{ backgroundColor: "#837979", color: "white" }}
          title={
            <Box sx={{ display: "flex", alignItems: "center", color: "white" }}>
              <Typography variant="h5" sx={{ marginRight: 1 }}>
                {card.name}
              </Typography>
              <IconButton
                sx={{ color: "white" }}
                onClick={() => ClickOpenEdit(card.id)}
              >
                <EditIcon />
              </IconButton>
            </Box>
          }
          action={
            <IconButton
              onClick={() => DeleteColumn(card.id)}
              sx={{ color: "white" }}
            >
              <DeleteIcon />
            </IconButton>
          }
        />
        <CardContent className="st-card-content">
          {card.boards.length > 0 ? (
            <Box>
              {card.boards.map((board) => (
                <TaskCard
                  key={board.id}
                  board={board}
                  columnId={card.id}
                  moveTask={MoveTask}
                  deleteTask={DeleteTask}
                />
              ))}
            </Box>
          ) : (
            <Typography>ไม่มี Task</Typography>
          )}
        </CardContent>
        <CardActions className="st-c-end">
          <Button
            variant="contained"
            color="inherit"
            sx={{ borderRadius: "20px" }}
            startIcon={<AddCircleIcon />}
            onClick={() => AddTask(card.id)}
          >
            Task
          </Button>
        </CardActions>
      </Card>
    );
  };
  const TaskCard: React.FC<TaskCardProps> = ({
    board,
    columnId,
    moveTask,
    deleteTask,
  }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
      type: ItemType.INNER_CARD,
      item: { innerCardId: board.id, fromCardId: columnId },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }));

    const [, drop] = useDrop(() => ({
      accept: ItemType.INNER_CARD,
      drop: (item: { innerCardId: number; fromCardId: number }) => {
        moveTask(item.innerCardId, item.fromCardId, columnId);
      },
    }));

    return (
      <Card
        ref={(node) => drag(drop(node))}
        className="st-incard"
        sx={{
          backgroundColor: "#C7BBBB",
          borderRadius: "20px",
          opacity: isDragging ? 0.5 : 1,
          cursor: "pointer",
        }}
      >
        <TextField
          sx={{ marginLeft: "1rem", width: "100%" }}
          type="text"
          placeholder="ชื่อ"
          value={board.name}
          InputProps={{ readOnly: true }}
        />
        <IconButton
          onClick={() => {
            ClickOpenEdittask(board.id);
          }}
        >
          <EditIcon />
        </IconButton>
        <IconButton aria-label="settings" onClick={() => deleteTask(board.id)}>
          <DeleteIcon />
        </IconButton>
      </Card>
    );
  };
  const convertToCardItems = (
    columns: columnGetRequst[],
    boardsByColumn: { [key: number]: task[] }
  ): CardItem[] => {
    console.log("Columns:", columns);
    console.log("Boards By Column:", boardsByColumn);

    return columns.map((column) => ({
      id: column.id,
      name: column.name,
      innerCards: [], // ถ้าคุณไม่มี innerCards
      boards: boardsByColumn[column.id] || [],
    }));
  };

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <div>
          <AppbarPage />
        </div>
        <div className="st-bt-ct">
          <Button
            startIcon={<AddCircleIcon />}
            variant="contained"
            sx={{
              backgroundColor: "#A5DD9B",
              borderRadius: "20px",
              color: "black",
              "&:hover": {
                backgroundColor: "#00db00",
              },
            }}
            onClick={AddColumn}
          >
            Column
          </Button>
          <Stack direction="row" spacing={5} marginTop="2rem">
            {convertToCardItems(column, taskByColumn).map((card) => (
              <OuterCard key={card.id} card={card} />
            ))}
          </Stack>
        </div>
      </DndProvider>
      <EditNameColumn
        open={openedit}
        onClose={CloseEdit}
        cardid={cardid}
        getAllcolumn={getAllcolumn}
        refreshTasks={refreshTasks} // ส่งฟังก์ชันรีเฟรชข้อมูล
      />
      <EditNameTask
        open={openedit2}
        onClose={CloseEdittask}
        taskid={taskid}
        refreshTasks={refreshTasks} // ส่งฟังก์ชันรีเฟรชข้อมูล
      />
    </>
  );
}

export default TaskPage;
