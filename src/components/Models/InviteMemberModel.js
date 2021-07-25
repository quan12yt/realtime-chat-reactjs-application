import { Form, Select, Modal, Spin } from "antd";
import React, { useContext, useMemo, useState } from "react";
import { AppContext } from "./../../Context/AppProvider";
import debounce from "lodash.debounce";
import Avatar from "antd/lib/avatar/avatar";
import { db } from "../../Firebase/config";

function DebounceSelect({
  fetchOptions,
  debounceTimeOut = 300,
  currentMembers,
  ...props
}) {
  const [fetching, setFetching] = useState(false);
  const [options, setOptions] = useState([]);

  const debounceFetcher = useMemo(() => {
    const loadOptions = (value) => {
      setOptions([]);
      setFetching(true);

      fetchOptions(value, currentMembers).then((newOptions) => {
        setOptions(newOptions);
        setFetching(false);
      });
    };

    return debounce(loadOptions, debounceTimeOut);
  }, [debounceTimeOut, fetchOptions, currentMembers]);

  return (
    <Select
      labelInValue
      onSearch={debounceFetcher}
      filterOption={false}
      notFoundContent={fetching ? <Spin size="small" /> : null}
      {...props}
    >
      {options.map((option) => (
        <Select.Option
          key={option.value}
          value={option.value}
          title={option.label}
        >
          <Avatar size="small" src={option.photoUrl}>
            {option.photoUrl ? "" : option.label?.charAt(0)?.toUpperCase()}
          </Avatar>
          {` ${option.label}`}
        </Select.Option>
      ))}
    </Select>
  );
}

async function fetchUserList(search, currentMembers) {
  return db
    .collection("users")
    .where("keywords", "array-contains", search)
    .orderBy("displayName")
    .limit(20)
    .get()
    .then((snapshot) => {
      return snapshot.docs
        .map((doc) => ({
          label: doc.data().displayName,
          value: doc.data().uid,
          photoUrl: doc.data().photoUrl,
        }))
        .filter((opt) => !currentMembers.includes(opt.value));
    });
}

export default function InviteMemberModel() {
  const [value, setValue] = useState([]);
  const { isInviteVisible, setIsInviteVisible, selectedRoomId, selectedRoom } =
    useContext(AppContext);

  const [form] = Form.useForm();

  const handleCancel = () => {
    form.resetFields();
    setIsInviteVisible(false);
  };
  const handleOK = () => {
    form.resetFields();
    setValue([]);

    const roomRef = db.collection("rooms").doc(selectedRoomId);
    roomRef.update({
      members: [...selectedRoom.members, ...value.map((v) => v.value)],
    });

    setIsInviteVisible(false);
  };

  return (
    <Modal
      title="Invite your friend"
      visible={isInviteVisible}
      onOk={handleOK}
      onCancel={handleCancel}
    >
      <Form form={form} layout="vertical">
        <DebounceSelect
          mode="multiple"
          label="Member name"
          value={value}
          placeholder="Enter name"
          fetchOptions={fetchUserList}
          onChange={(newValue) => setValue(newValue)}
          style={{ width: "100%" }}
          currentMembers={selectedRoom.members}
        ></DebounceSelect>
      </Form>
    </Modal>
  );
}
