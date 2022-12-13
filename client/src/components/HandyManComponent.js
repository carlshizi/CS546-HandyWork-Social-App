import React, { useState } from 'react';
import { Card, Button, Collapse } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';

export default function HandyManComponent({ handyMan }) {

    const [open, setOpen] = useState(false);

    return (
        <Card className="mb-3">
            <Card.Body>
                <div className="d-flex justify-content-between">
                    <div>
                        <Card.Title>
                            {handyMan.name}
                        </Card.Title>
                        <Card.Subtitle className="text-muted mb-2">
                            {handyMan.location}
                        </Card.Subtitle>
                    </div>
                    <img className="d-none d-md-block" height="50" alt={handyMan.name} src={handyMan.pic}></img>
                </div>
                <Card.Text>
                    <Button 
                        onClick={() => setOpen(prevOpen => !prevOpen)} 
                        variant="primary"
                    >
                        {open ? 'Hide Details' : 'View Details'}
                    </Button>
                </Card.Text>
                <Collapse in={open}>
                    <div className="mt-4">
                        <ReactMarkdown source={handyMan.description} escapeHtml={false}/>
                    </div>
                </Collapse>
            </Card.Body>
        </Card>
    )
}