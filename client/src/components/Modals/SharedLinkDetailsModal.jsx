import React from 'react';
import { Button, Modal, Typography } from 'antd';
import { DownloadOutlined, LinkOutlined } from '@ant-design/icons';
import moment from 'moment';

const { Text } = Typography;

const SharedLinkDetailsModal = ({ isVisible, onClose, selectedLink, onDownload }) => {
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
                        <Text strong>Shared With: </Text>
                        <Text>
                            {selectedLink.shared_with?.first_name} {selectedLink.shared_with?.last_name}
                            {' '}({selectedLink.shared_with?.email})
                        </Text>
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