import React from "react";
import { Modal } from "react-bootstrap";
import { Link } from 'react-router-dom';

const BuyModal = ({show, handleClose, removeSneakersLink}) => {

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Congratulations</Modal.Title>
            </Modal.Header>
            <Modal.Body>The sneaker has been added to the cart</Modal.Body>
            <Modal.Footer>
            { !removeSneakersLink && <Link className="button-name" to="/sneakers">Back to sneakers</Link> }
            <Link className="button-name" to="/cart">Check your cart</Link>
            </Modal.Footer>
        </Modal>
    )
}

export default BuyModal