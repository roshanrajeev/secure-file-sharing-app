import React, { useState, useEffect } from 'react';
import { Button, Card, Col, Row, Typography, Popover, Avatar, Tag } from 'antd';
import moment from 'moment';
import { DownloadOutlined, LinkOutlined, InfoCircleOutlined, UserOutlined, GlobalOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { useAuth } from '../hooks/useAuth';
import SharedLinkDetailsModal from './Modals/SharedLinkDetailsModal';

const { Title, Text } = Typography;

const dummyUsers = [
    { first_name: 'John', last_name: 'Doe', email: 'john.doe@example.com', avatar: null },
    { first_name: 'Jane', last_name: 'Smith', email: 'jane.smith@example.com', avatar: null },
    { first_name: 'Mike', last_name: 'Johnson', email: 'mike.j@example.com', avatar: null },
    { first_name: 'Sarah', last_name: 'Wilson', email: 'sarah.w@example.com', avatar: null },
    { first_name: 'Alex', last_name: 'Brown', email: 'alex.b@example.com', avatar: null }
];

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

    const getRandomUsers = () => {
        const numUsers = Math.floor(Math.random() * 3) + 2; // Random number between 2 and 4
        const shuffled = [...dummyUsers].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, numUsers);
    };

    const renderExpiryInfo = (link) => {
        console.log({link})
        if (!link.folder_expiry) {
            return <Tag icon={<ClockCircleOutlined />} color="green">No expiry date</Tag>;
        }

        const expiryMoment = moment(link.folder_expiry);
        const isExpired = moment().isAfter(expiryMoment);

        return (
            <Tag 
                icon={<ClockCircleOutlined />} 
                color={isExpired ? 'red' : 'orange'}
            >
                {isExpired ? 'Expired' : `Expires ${expiryMoment.fromNow()}`}
            </Tag>
        );
    };

    const renderSharedWith = (link) => {
        if (link.share_with_all) {
            return (
                <div className="mb-2">
                    <Text className="text-sm text-gray-500">Sharing:</Text>
                    <div className="mt-1 flex items-center">
                        <Tag icon={<GlobalOutlined />} color="blue">
                            Anyone with link
                        </Tag>
                    </div>
                </div>
            );
        }

        const sharedUsers = link.shared_with || getRandomUsers();
        return (
            <div className="mb-2">
                <Text className="text-sm text-gray-500">Shared with:</Text>
                <div className="mt-1">
                    <Avatar.Group
                        maxCount={3}
                        maxStyle={{ color: '#f56a00', backgroundColor: '#fde3cf' }}
                    >
                        {sharedUsers.map((user, index) => (
                            <Popover
                                key={index}
                                content={
                                    <div>
                                        <p>{`${user.first_name} ${user.last_name}`}</p>
                                        <p className="text-gray-500">{user.email}</p>
                                    </div>
                                }
                                trigger="hover"
                            >
                                <Avatar icon={<UserOutlined />} />
                            </Popover>
                        ))}
                    </Avatar.Group>
                </div>
            </div>
        );
    };

    const sortAndFilterLinks = (links) => {
        return [...links].sort((a, b) => {
            // First sort by expiry status
            const aExpired = a.folder_expiry && moment().isAfter(moment(a.folder_expiry));
            const bExpired = b.folder_expiry && moment().isAfter(moment(b.folder_expiry));
            
            if (aExpired !== bExpired) {
                return aExpired ? 1 : -1; // Expired links go to the end
            }
            
            // Then sort by created_at (newest first)
            return moment(b.created_at).valueOf() - moment(a.created_at).valueOf();
        });
    };

    const renderCard = (link) => {
        const isExpired = link.folder_expiry && moment().isAfter(moment(link.folder_expiry));
        
        return (
            <Col xs={24} sm={12} md={8} lg={6} key={link.id}>
                <Card
                    loading={loading}
                    actions={[
                        <Button 
                            type="text" 
                            icon={<DownloadOutlined />} 
                            onClick={() => handleDownload(link)}
                            disabled={isExpired}
                        />,
                        <Button
                            type="text"
                            icon={<LinkOutlined />}
                            onClick={() => window.open(`http://localhost:3000/shared/${link?.uid}`, '_blank')}
                            disabled={isExpired}
                        />,
                        <Button
                            type="text"
                            icon={<InfoCircleOutlined />}
                            onClick={() => showDetails(link)}
                        />
                    ]}
                    style={{
                        opacity: isExpired ? 0.6 : 1,
                        filter: isExpired ? 'grayscale(50%)' : 'none'
                    }}
                >
                    <Card.Meta
                        title={
                            <Text style={{ color: isExpired ? '#999' : 'inherit' }}>
                                {link.file_name}
                            </Text>
                        }
                        description={
                            <>
                                {renderSharedWith(link)}
                                <div className="mb-2">
                                    {renderExpiryInfo(link)}
                                </div>
                                <Text type="secondary">
                                    Created {moment(link.created_at).fromNow()}
                                </Text>
                            </>
                        }
                    />
                </Card>
            </Col>
        );
    };

    return (
        <div className="mb-12">
            <Title level={2}>My Shared Links</Title>
            <Row gutter={[16, 16]}>
                {sortAndFilterLinks(links).map(link => renderCard(link))}
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