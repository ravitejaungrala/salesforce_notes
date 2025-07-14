document.addEventListener('DOMContentLoaded', function() {
    // Sidebar toggle functionality
    const sidebarToggle = document.getElementById('sidebarToggle');
    const mobileSidebarToggle = document.getElementById('mobileSidebarToggle');
    const wrapper = document.getElementById('wrapper');

    sidebarToggle.addEventListener('click', function() {
        wrapper.classList.toggle('toggled');
    });

    mobileSidebarToggle.addEventListener('click', function() {
        wrapper.classList.toggle('toggled');
    });

    // Load content dynamically
    const contentArea = document.getElementById('content-area');
    const sidebarLinks = document.querySelectorAll('#sidebar-wrapper a[href^="#"]:not([data-bs-toggle="collapse"])');
    
    // Sample content - in a real app, you'd fetch this from JSON files
    const contentDatabase = {
        'intro-salesforce': {
            title: 'Introduction to Salesforce',
            content: `
                <div class="card content-card">
                    <div class="card-header content-header">
                        <h2><i class="fas fa-cube me-2"></i> Introduction to Salesforce</h2>
                    </div>
                    <div class="card-body content-body">
                        <div class="definition-box">
                            <h4><i class="fas fa-book me-2"></i> Definition</h4>
                            <p>Salesforce is a cloud-based Customer Relationship Management (CRM) platform that provides a suite of tools and services for managing customer interactions, automating business processes, and building custom applications.</p>
                            <p class="mb-0">It operates on a multi-tenant architecture where multiple customers share the same infrastructure while maintaining data isolation.</p>
                        </div>

                        <h3 class="mt-4"><i class="fas fa-star me-2"></i> Key Concepts</h3>
                        <ul class="list-group list-group-flush mb-4">
                            <li class="list-group-item">
                                <strong>Multi-tenancy</strong>: Single instance serves multiple customers ("tenants") with data isolation
                            </li>
                            <li class="list-group-item">
                                <strong>Metadata-driven architecture</strong>: Configuration stored as metadata
                            </li>
                            <li class="list-group-item">
                                <strong>PaaS offerings</strong>: Heroku, Lightning Platform for custom app development
                            </li>
                            <li class="list-group-item">
                                <strong>Declarative development</strong>: Build with clicks, not just code
                            </li>
                        </ul>

                        <div class="example-box">
                            <h4 class="example-header"><i class="fas fa-laptop-code me-2"></i> Example</h4>
                            <p>A technology company uses Salesforce to:</p>
                            <ul>
                                <li>Track customer interactions across email, phone, and chat</li>
                                <li>Manage their sales pipeline with Opportunities</li>
                                <li>Automate marketing campaigns with Pardot integration</li>
                                <li>Build custom apps for their field service technicians</li>
                            </ul>
                        </div>

                        <div class="how-to-box">
                            <h4 class="how-to-header"><i class="fas fa-tasks me-2"></i> How to Get Started</h4>
                            <ol>
                                <li>Sign up for a <a href="https://developer.salesforce.com/signup" target="_blank">Developer Edition account</a></li>
                                <li>Explore standard objects like Accounts, Contacts, and Opportunities</li>
                                <li>Create custom objects for specific business needs</li>
                                <li>Try Trailhead (Salesforce's free learning platform)</li>
                            </ol>
                        </div>

                        <div class="alert alert-info mt-4">
                            <i class="fas fa-lightbulb me-2"></i> <strong>Tip:</strong> The Developer Edition account is completely free and perfect for learning Salesforce development.
                        </div>
                    </div>
                </div>
            `
        },
        'apex': {
            title: 'Apex Programming Language',
            content: `
                <div class="card content-card">
                    <div class="card-header content-header">
                        <h2><i class="fab fa-salesforce me-2"></i> Apex Programming Language</h2>
                    </div>
                    <div class="card-body content-body">
                        <div class="definition-box">
                            <h4><i class="fas fa-book me-2"></i> Definition</h4>
                            <p>Apex is Salesforce's proprietary, strongly-typed, object-oriented programming language that allows developers to execute flow and transaction control statements on the Lightning Platform in conjunction with calls to the API.</p>
                            <p class="mb-0">It uses syntax that looks like Java and acts like database stored procedures.</p>
                        </div>

                        <h3 class="mt-4"><i class="fas fa-code me-2"></i> Key Features</h3>
                        <div class="row mb-4">
                            <div class="col-md-6">
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item">
                                        <strong>Object-oriented</strong>: Classes, interfaces, inheritance
                                    </li>
                                    <li class="list-group-item">
                                        <strong>Database integrated</strong>: Direct access to Salesforce data
                                    </li>
                                    <li class="list-group-item">
                                        <strong>Strongly-typed</strong>: Compile-time checking
                                    </li>
                                </ul>
                            </div>
                            <div class="col-md-6">
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item">
                                        <strong>Governor limits aware</strong>: Runtime limits enforcement
                                    </li>
                                    <li class="list-group-item">
                                        <strong>Transaction control</strong>: Savepoints, rollbacks
                                    </li>
                                    <li class="list-group-item">
                                        <strong>Multitenant environment</strong>: Runs securely on Salesforce servers
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div class="example-box">
                            <h4 class="example-header"><i class="fas fa-laptop-code me-2"></i> Example: Account Contact Counter</h4>
                            <pre><code class="language-java">// Apex class to count contacts on accounts
public class AccountProcessor {
    /**
     * Updates the Number_of_Contacts__c field on accounts
     * with the count of their related contacts
     * @param accountIds List of Account IDs to process
     */
    @future
    public static void countContacts(List<ID> accountIds) {
        // Query accounts with their contacts
        List<Account> accounts = [SELECT Id, Number_of_Contacts__c, 
                                (SELECT Id FROM Contacts) 
                                FROM Account WHERE Id IN :accountIds];
        
        // Update contact count for each account
        for (Account acc : accounts) {
            acc.Number_of_Contacts__c = acc.Contacts.size();
        }
        
        // Perform bulk update
        update accounts;
    }
}</code></pre>
                            <p class="mt-2">This example shows:</p>
                            <ul>
                                <li>Bulkified Apex pattern</li>
                                <li>@future annotation for asynchronous processing</li>
                                <li>Relationship query (child-to-parent)</li>
                            </ul>
                        </div>

                        <div class="how-to-box">
                            <h4 class="how-to-header"><i class="fas fa-tasks me-2"></i> How to Work with Apex</h4>
                            <ol>
                                <li>Develop in <strong>Developer Console</strong> (quick access) or <strong>VS Code</strong> (recommended for serious development)</li>
                                <li>Use <strong>anonymous Apex</strong> for quick tests and data operations</li>
                                <li>Implement <strong>trigger frameworks</strong> for maintainability</li>
                                <li>Always write <strong>unit tests</strong> (minimum 75% coverage required)</li>
                                <li>Follow <strong>bulkification patterns</strong> to avoid governor limits</li>
                            </ol>
                        </div>

                        <div class="alert alert-warning mt-4">
                            <i class="fas fa-exclamation-triangle me-2"></i> <strong>Important:</strong> Apex runs in system context without sharing mode by default. Use 'with sharing' keyword to enforce record-level permissions.
                        </div>
                    </div>
                </div>
            `
        },
        // More content entries for each topic
    };

    // Load content when sidebar links are clicked
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const topicId = this.getAttribute('href').substring(1);
            loadContent(topicId);
            
            // Close sidebar on mobile after selection
            if (window.innerWidth < 768) {
                wrapper.classList.add('toggled');
            }
        });
    });

    function loadContent(topicId) {
        if (contentDatabase[topicId]) {
            contentArea.innerHTML = contentDatabase[topicId].content;
            document.title = `${contentDatabase[topicId].title} | Salesforce Developer Hub`;
            
            // Highlight active sidebar item
            sidebarLinks.forEach(link => link.classList.remove('active'));
            document.querySelector(`a[href="#${topicId}"]`).classList.add('active');
            
            // Scroll to top
            window.scrollTo(0, 0);
            
            // Highlight any code blocks
            if (typeof Prism !== 'undefined') {
                Prism.highlightAll();
            }
        } else {
            contentArea.innerHTML = `
                <div class="alert alert-warning">
                    <h4><i class="fas fa-exclamation-triangle me-2"></i> Content Not Found</h4>
                    <p>The requested topic is not available yet. Please check back later.</p>
                    <a href="#" class="btn btn-primary">Return to Home</a>
                </div>
            `;
        }
    }

    // Load content if URL has a hash (direct link to topic)
    if (window.location.hash) {
        loadContent(window.location.hash.substring(1));
    }

    // Add animation to sidebar sections
    const sidebarSections = document.querySelectorAll('.sidebar-section');
    sidebarSections.forEach(section => {
        section.addEventListener('click', function() {
            const icon = this.querySelector('.fa-chevron-down');
            if (icon) {
                icon.classList.toggle('fa-rotate-180');
            }
        });
    });
});
