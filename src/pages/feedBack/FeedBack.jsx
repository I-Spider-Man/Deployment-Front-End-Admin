import React, { useEffect, useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import { deleteFeedBack, fetchFeedBacks, postFeedBackReply } from '../../DataBase/FeedBack';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';

function FeedBack() {
    const [feedBacks, setFeedBacks] = useState([]);
    const [open, setOpen] = useState(false);
    const [reply, setReply] = useState('');
    const [replyProcess, setReplyProcess] = useState(false);
    const [selectedFeedBackId, setSelectedFeedBackId] = useState(null);
    const [render,setRender]=useState(false);
    const handleReply = async (feedBackId) => {
        try {
            setReplyProcess(true);
            const res = await postFeedBackReply(feedBacks.find(feedBack => feedBack.id === feedBackId), reply);
            setReply('');
        } catch (error) {
            console.log(error);
        } finally {
            setReplyProcess(false);
            setOpen(false);
            setRender(!render);
        }
    }
    const handleDelete=async(id)=>{
        await deleteFeedBack(id);
        setRender(!render);
    }
    useEffect(() => {
        const fetch = async () => {
            const res = await fetchFeedBacks();
            setFeedBacks(res);
        }
        fetch();
    }, [render])

    return (
        <div>
            <div className="list">
                <Sidebar />
                <div className="listContainer">
                    <Navbar />
                    <div style={{ backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', padding: '20px' }}>
                        {feedBacks?.map(feedBack => (
                            <div key={feedBack.id} style={{ padding: '10px', borderBottom: '1px solid #ddd' }}>
                                <p>UserId: {feedBack?.userData?.userId} </p>
                                <p>FeedBack: {feedBack.feedBack}</p>
                                {!feedBack?.adminReply?.trim() ?
                                    feedBack.indicate && <LoadingButton variant='contained' onClick={() => { setOpen(true); setSelectedFeedBackId(feedBack.id); }}>Reply</LoadingButton> :
                                    <p>Reply: {feedBack?.adminReply}</p>}
                                <Button onClick={()=>{handleDelete(feedBack.id)}} variant='outlined'>Clear</Button>
                            </div>
                        ))}
                        <Dialog open={open} onClose={() => setOpen(false)}>
                            <DialogTitle>
                                Reply To User
                            </DialogTitle>
                            <DialogContent>
                                {selectedFeedBackId && feedBacks.find(feedBack => feedBack.id === selectedFeedBackId) &&
                                    <>
                                        <p>FeedBack: {feedBacks.find(feedBack => feedBack.id === selectedFeedBackId).feedBack}</p>
                                        <TextField value={reply} onChange={(e) => { setReply(e.target.value) }} label="Your reply" />
                                    </>
                                }
                            </DialogContent>
                            <DialogActions>
                                <LoadingButton loading={replyProcess} disabled={!reply.trim()} loadingIndicator={<Button variant='contained' disabled>sending..</Button>} onClick={() => { handleReply(selectedFeedBackId) }}>Send</LoadingButton>
                            </DialogActions>
                        </Dialog>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FeedBack
