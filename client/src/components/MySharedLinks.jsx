import React, { useState, useEffect } from 'react';
import { Button, Card, Col, Row, Typography, Popover } from 'antd';
import moment from 'moment';
import { DownloadOutlined, LinkOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { useAuth } from '../hooks/useAuth';
import SharedLinkDetailsModal from './Modals/SharedLinkDetailsModal';

const { Title, Text } = Typography;

const MySharedLinks = () => {
    const [links, setLinks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedLink, setSelectedLink] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        const fetchLinks = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/v1/storage/folders/my_shared_folders', {
                    method: 'GET',
                    credentials: 'include',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    console.log(data);
                    setLinks(data);
                }
            } catch (error) {
                console.error('Error fetching links:', error);
            } finally {
                setLoading(false);
            }
        };

        if (isAuthenticated) {
            fetchLinks();
        }
    }, [isAuthenticated]);

    const handleDownload = async (record) => {
        try {
            const response = await fetch(`/api/storage/download/${record.uid}/`);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = record.file_name;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } catch (error) {
            console.error('Error downloading file:', error);
        }
    };

    const showDetails = (link) => {
        setSelectedLink(link);
        setIsModalVisible(true);
    };

    return (
        <div className="mb-12">
            <Title level={2}>My Shared Links</Title>
            <Row gutter={[16, 16]}>
                {links.map(link => (
                    <Col xs={24} sm={12} md={8} lg={6} key={link.id}>
                        <Card
                            loading={loading}
                            actions={[
                                <Button 
                                    type="text" 
                                    icon={<DownloadOutlined />} 
                                    onClick={() => handleDownload(link)}
                                />,
                                <Button
                                    type="text"
                                    icon={<LinkOutlined />}
                                    onClick={() => window.open(`http://localhost:3000/shared/${link?.uid}`, '_blank')}
                                />,
                                <Button
                                    type="text"
                                    icon={<InfoCircleOutlined />}
                                    onClick={() => showDetails(link)}
                                />
                            ]}
                        >
                            <Card.Meta
                                title={link.file_name}
                                description={
                                    <>
                                        <Popover
                                            content={link.shared_with?.email}
                                            trigger="hover"
                                        >
                                            <Text className="cursor-pointer">
                                                Shared with: {link.shared_with?.first_name} {link.shared_with?.last_name}
                                            </Text>
                                        </Popover>
                                        <br />
                                        <Text type="secondary">
                                            {moment(link.created_at).fromNow()}
                                        </Text>
                                    </>
                                }
                            />
                        </Card>
                    </Col>
                ))}
            </Row>

            <SharedLinkDetailsModal 
                isVisible={isModalVisible}
                onClose={() => setIsModalVisible(false)}
                selectedLink={selectedLink}
                onDownload={handleDownload}
            />
        </div>
    );
};

export default MySharedLinks; 