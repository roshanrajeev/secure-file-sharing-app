import React from 'react';
import { Button, Modal, Typography, Avatar, Tag } from 'antd';
import { DownloadOutlined, LinkOutlined, UserOutlined, GlobalOutlined } from '@ant-design/icons';
import moment from 'moment';

const { Text } = Typography;

const SharedLinkDetailsModal = ({ isVisible, onClose, selectedLink, onDownload }) => {
    const renderSharedWith = () => {
        if (selectedLink.share_with_all) {
            return (
                <div className="mt-2">
                    <Tag icon={<GlobalOutlined />} color="blue">
                        Anyone with link can access
                    </Tag>
                </div>
            );
        }

        return (
            <div className="mt-2">
                {selectedLink.shared_with?.map((user, index) => (
                    <div key={index} className="flex items-center mb-1">
                        <Avatar icon={<UserOutlined />} className="mr-2" />
                        <Text>
                            {user.first_name} {user.last_name}
                            {' '}({user.email})
                        </Text>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <Modal
            title="Shared Link Details"
            open={isVisible}
            onCancel={onClose}
            footer={null}
            width={600}
        >
            {selectedLink && (
                <div className="py-5">
                    <p>
                        <Text strong>File Name: </Text>
                        <Text>{selectedLink.file_name}</Text>
                    </p>
                    <p>
                        <Text strong>Sharing: </Text>
                        {renderSharedWith()}
                    </p>
                    <p>
                        <Text strong>Created: </Text>
                        <Text>{moment(selectedLink.created_at).format('MMMM Do YYYY, h:mm:ss a')}</Text>
                    </p>
                    <p>
                        <Text strong>Share Link: </Text>
                        <Text copyable>
                            {`http://localhost:3000/shared/${selectedLink?.uid}`}
                        </Text>
                    </p>
                    <div className="mt-5">
                        <Button 
                            type="primary" 
                            icon={<DownloadOutlined />}
                            onClick={() => onDownload(selectedLink)}
                            className="mr-2.5"
                        >
                            Download
                        </Button>
                        <Button
                            icon={<LinkOutlined />}
                            onClick={() => window.open(`http://localhost:3000/shared/${selectedLink?.uid}`, '_blank')}
                        >
                            Open Link
                        </Button>
                    </div>
                </div>
            )}
        </Modal>
    );
};

export default SharedLinkDetailsModal; 