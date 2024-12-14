import React from 'react';
import { Modal, Button, Typography, Space, Tag, Avatar, Divider } from 'antd';
import { 
    DownloadOutlined, 
    LinkOutlined, 
    UserOutlined, 
    GlobalOutlined,
    ClockCircleOutlined
} from '@ant-design/icons';
import moment from 'moment';

const { Text, Title } = Typography;

const SharedLinkDetailsModal = ({ isVisible, onClose, selectedLink, onDownload }) => {
    if (!selectedLink) return null;

    const isExpired = selectedLink.folder_expiry && moment().isAfter(moment(selectedLink.folder_expiry));

    const renderExpiryStatus = () => {
        if (!selectedLink.folder_expiry) {
            return (
                <Tag icon={<ClockCircleOutlined />} color="green">
                    No expiry date
                </Tag>
            );
        }

        const expiryMoment = moment(selectedLink.folder_expiry);
        return (
            <Tag 
                icon={<ClockCircleOutlined />} 
                color={isExpired ? 'red' : 'orange'}
            >
                {isExpired ? 'Expired' : `Expires ${expiryMoment.fromNow()}`}
            </Tag>
        );
    };

    const renderSharedWith = () => {
        if (selectedLink.share_with_all) {
            return (
                <Space direction="vertical">
                    <Text type="secondary">Sharing:</Text>
                    <Tag icon={<GlobalOutlined />} color="blue">
                        Anyone with link
                    </Tag>
                </Space>
            );
        }

        return (
            <Space direction="vertical" style={{ width: '100%' }}>
                <Text type="secondary">Shared with:</Text>
                <Space wrap>
                    {(selectedLink.shared_with || []).map((user, index) => (
                        <Tag key={index} style={{ padding: '4px 8px' }}>
                            <Space>
                                <Avatar size="small" icon={<UserOutlined />} />
                                <span>{`${user.first_name} ${user.last_name}`}</span>
                            </Space>
                        </Tag>
                    ))}
                </Space>
            </Space>
        );
    };

    return (
        <Modal
            title="Shared Link Details"
            open={isVisible}
            onCancel={onClose}
            footer={[
                <Button key="close" onClick={onClose}>
                    Close
                </Button>,
                <Button
                    key="download"
                    type="primary"
                    icon={<DownloadOutlined />}
                    onClick={() => onDownload(selectedLink)}
                    disabled={isExpired}
                >
                    Download
                </Button>,
                <Button
                    key="link"
                    type="primary"
                    icon={<LinkOutlined />}
                    onClick={() => window.open(`http://localhost:3000/shared/${selectedLink?.uid}`, '_blank')}
                    disabled={isExpired}
                >
                    Open Link
                </Button>
            ]}
        >
            <Space direction="vertical" style={{ width: '100%' }} size="large">
                <div>
                    <Title level={4} style={{ 
                        marginBottom: '8px',
                        color: isExpired ? '#999' : 'inherit' 
                    }}>
                        {selectedLink.file_name}
                    </Title>
                    {renderExpiryStatus()}
                </div>

                <Divider style={{ margin: '12px 0' }} />

                {renderSharedWith()}

                <Divider style={{ margin: '12px 0' }} />

                <Space direction="vertical">
                    <Text type="secondary">Created:</Text>
                    <Text>{moment(selectedLink.created_at).format('MMMM Do YYYY, h:mm:ss a')}</Text>
                </Space>

                {isExpired && (
                    <div style={{ 
                        backgroundColor: '#fff2f0', 
                        padding: '12px',
                        borderRadius: '4px',
                        border: '1px solid #ffccc7'
                    }}>
                        <Text type="danger">
                            This shared link has expired and is no longer accessible.
                        </Text>
                    </div>
                )}
            </Space>
        </Modal>
    );
};

export default SharedLinkDetailsModal; 