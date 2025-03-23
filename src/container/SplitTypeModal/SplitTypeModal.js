import React, { useState } from "react";
import "./SplitTypeModal.css";

const SplitTypeModal = ({
  isOpen,
  onClose,
  expenseType,
  users,
  onSplitConfirmed,
}) => {
  const [splitType, setSplitType] = useState("EQUAL");
  const [splitValues, setSplitValues] = useState({});

  if (!isOpen) return null;

  const handleSplitTypeSelection = (type) => {
    setSplitType(type);
    setSplitValues({});
  };

  const handleSplitValueChange = (userId, value) => {
    setSplitValues((prev) => ({ ...prev, [userId]: value }));
  };

  const confirmSplit = () => {
    onSplitConfirmed({ type: splitType, values: splitValues });
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2 className="black-text-color">Select Split Type</h2>

        <div className="split-type-options">
          {["EQUAL", "PERCENTAGE", "AMOUNT"].map((type) => (
            <button
              key={type}
              className={
                "split-option-buttons " + (splitType === type ? "selected" : "")
              }
              onClick={() => handleSplitTypeSelection(type)}
            >
              Split by {type}
            </button>
          ))}
        </div>

        {splitType !== "EQUAL" && (
          <div className="split-values">
            {users.map((user) => (
              <div key={user.id} className="split-input">
                <div className="split-username">{user.username}</div>
                <input
                  type="number"
                  placeholder={splitType === "PERCENTAGE" ? "%" : "₹"}
                  value={splitValues[user.id] || ""}
                  onChange={(e) =>
                    handleSplitValueChange(user.id, e.target.value)
                  }
                />
              </div>
            ))}
          </div>
        )}

        <div className="modal-actions">
          <button className="confirm-btn" onClick={confirmSplit}>
            Confirm Split
          </button>
          <button className="close-btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default SplitTypeModal;
