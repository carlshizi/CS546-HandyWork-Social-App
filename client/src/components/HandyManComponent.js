import React, { useState } from 'react';
import { Card, Button, Collapse } from 'react-bootstrap';

export default function HandyManComponent({ handyMan }) {

    const [open, setOpen] = useState(false);

    return (
        <Card className="mb-3">
            <Card.Body>
                <div className="d-flex justify-content-between">
                    <div>
                        <Card.Title>
                            {handyMan.username}
                        </Card.Title>
                        <Card.Subtitle className="text-muted mb-2">
                            {handyMan.location}
                        </Card.Subtitle>
                    </div>
                    {/* <img className="d-none d-md-block" height="50" alt={handyMan.name} src={handyMan.pic}></img> */}
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
                        {`Description: ${handyMan.postMessage}`}
                    </div>
                </Collapse>
            </Card.Body>
        </Card>
    )
}