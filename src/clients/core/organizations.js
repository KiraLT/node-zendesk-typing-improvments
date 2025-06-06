// File: organizations.js
const {Client} = require('../client');

/**
 * @class
 * Client for interacting with the Zendesk Organizations API.
 * @see {@link https://developer.zendesk.com/api-reference/ticketing/organizations/organizations/}
 */
class Organizations extends Client {
  constructor(options) {
    super(options);
    this.jsonAPINames = ['organizations', 'organization'];
  }

  /**
   * Lists all organizations.
   * @returns {Promise<object>} The list of organizations.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/organizations/organizations/#list-organizations}
   * @example const organizations = await client.organizations.list();
   */
  async list() {
    return this.getAll(['organizations']);
  }

  /**
   * Lists organizations associated with a specific user.
   * @param {number} userID - The ID of the user.
   * @returns {Promise<object[]>} List of organizations associated with the user.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/organizations/organizations/#list-organizations}
   * @example const userOrgs = await client.organizations.listByUser(12345);
   */
  async listByUser(userID) {
    return this.getAll(['users', userID, 'organizations']);
  }

  /**
   * Counts the number of organizations.
   * @returns {Promise<number>} Number of organizations.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/organizations/organizations/#count-organizations}
   * @example const orgCount = await client.organizations.count();
   */
  async count() {
    const result = await this.getAll(['organizations', 'count']);
    return result.count;
  }

  /**
   * Counts the number of organizations associated with a specific user.
   * @param {number} userID - The ID of the user.
   * @returns {Promise<number>} Number of organizations associated with the user.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/organizations/organizations/#count-organizations}
   * @example const userOrgCount = await client.organizations.countByUser(12345);
   */
  async countByUser(userID) {
    const result = await this.getAll([
      'users',
      userID,
      'organizations',
      'count',
    ]);
    return result.count;
  }

  /**
   * Retrieves related information for a specific organization.
   * @param {number} organizationID - The ID of the organization.
   * @returns {Promise<{response: object, result: object}>} Object containing related information of the organization.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/organizations/organizations/#show-organizations-related-information}
   * @example const relatedInfo = await client.organizations.related(12345);
   */
  async related(organizationID) {
    return this.get(['organizations', organizationID, 'related']);
  }

  /**
   * Views a specific organization by its ID.
   * @param {number} organizationID - The ID of the organization.
   * @returns {Promise<{response: object, result: object}>} The organization's details.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/organizations/organizations/#show-organization}
   * @example const organization = await client.organizations.show(12345);
   */
  async show(organizationID) {
    return this.get(['organizations', organizationID]);
  }

  /**
   * Retrieves details of multiple organizations based on their IDs.
   * @param {number[]} organizationIDs - Array of organization IDs.
   * @returns {Promise<object[]>} List of organizations' details.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/organizations/organizations/#show-many-organizations}
   * @example const orgDetails = await client.organizations.showMany([12345, 67890]);
   */
  async showMany(organizationIDs) {
    return this.getAll([
      'organizations',
      'show_many',
      {
        ids: organizationIDs,
      },
    ]);
  }

  /**
   * Retrieves details of multiple organizations based on their External IDs.
   * @param {string[]} externalOrganizationIds - Array of organization IDs.
   * @returns {Promise<object[]>} List of organizations' details.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/organizations/organizations/#show-many-organizations}
   * @example const orgDetails = await client.organizations.showMany(['12345', '67890']);
   */
  async showManyByExternalIds(externalOrganizationIds) {
    return this.getAll([
      'organizations',
      'show_many',
      {
        external_ids: externalOrganizationIds,
      },
    ]);
  }

  /**
   * Creates a new organization.
   * @param {object} organization - The organization object to create.
   * @returns {Promise<{response: object, result: object}>} The created organization's details.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/organizations/organizations/#create-organization}
   * @example const newOrganization = await client.organizations.create({ name: 'New Org' });
   */
  async create(organization) {
    return this.post(['organizations'], organization);
  }

  /**
   * Creates multiple organizations.
   * @param {object[]} organizations - An array of organization objects to create.
   * @returns {Promise<{response: object, result: object[]}>} Details of the created organizations.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/organizations/organizations/#create-many-organizations}
   * @example const newOrganizations = await client.organizations.createMany([{ name: 'Org1' }, { name: 'Org2' }]);
   */
  async createMany(organizations) {
    return this.post(['organizations', 'create_many'], organizations);
  }

  /**
   * Creates or updates an organization.
   * @param {object} organization - The organization object to create or update.
   * @returns {Promise<{response: object, result: object}>} The created or updated organization's details.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/organizations/organizations/#create-or-update-organization}
   * @example const org = await client.organizations.createOrUpdate({ id: 12345, name: 'Updated Name' });
   */
  async createOrUpdate(organization) {
    return this.post(['organizations', 'create_or_update'], organization);
  }

  /**
   * Updates a specific organization by its ID.
   * @param {number} organizationID - The ID of the organization.
   * @param {object} organization - The updated organization object.
   * @returns {Promise<{response: object, result: object}>} The updated organization's details.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/organizations/organizations/#update-organization}
   * @example const updatedOrganization = await client.organizations.update(12345, { name: 'New Name' });
   */
  async update(organizationID, organization) {
    return this.put(['organizations', organizationID], organization);
  }

  /**
   * Updates multiple organizations.
   * @param {object[]} organizations - An array of organization objects to update.
   * @returns {Promise<{response: object, result: object[]}>} Details of the updated organizations.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/organizations/organizations/#update-many-organizations}
   * @example const updatedOrganizations = await client.organizations.updateMany([{ id: 1, name: 'Updated Org1' }, { id: 2, name: 'Updated Org2' }]);
   */
  async updateMany(organizations) {
    return this.put(['organizations', 'update_many'], organizations);
  }

  /**
   * Creates or updates an organization, similar to `createOrUpdate` method.
   * @param {object} organization - The organization object to upsert.
   * @returns {Promise<{response: object, result: object}>} The created or updated organization's details.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/organizations/organizations/#create-or-update-organization}
   * @example const org = await client.organizations.upsert({ id: 12345, name: 'Upserted Name' });
   */
  async upsert(organization) {
    return this.post(['organizations', 'create_or_update'], organization);
  }

  /**
   * Deletes a specific organization by its ID.
   * @param {number} organizationID - The ID of the organization to delete.
   * @returns {Promise<void>}
   * @throws {Error} Throws an error if deletion fails.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/organizations/organizations/#delete-organization}
   * @example await client.organizations.delete(12345);
   */
  async delete(organizationID) {
    return super.delete(['organizations', organizationID]);
  }

  /**
   * Deletes multiple organizations based on their IDs.
   * @param {number[]} organizationIds - Array of organization IDs.
   * @returns {Promise<object>} Returns a job status JSON object.
   * @throws {Error} Throws an error if deletion fails.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/organizations/organizations/#bulk-delete-organizations}
   * @example await client.organizations.bulkDelete([12345, 67890]);
   */
  async bulkDelete(organizationIds) {
    return super.delete([
      'organizations',
      'destroy_many',
      {
        ids: organizationIds,
      },
    ]);
  }

  /**
   * Deletes multiple organizations based on their external IDs.
   * @param {string[]} organizationExternalIds - Array of organization external IDs.
   * @returns {Promise<object>} Returns a job status JSON object.
   * @throws {Error} Throws an error if deletion fails.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/organizations/organizations/#bulk-delete-organizations}
   * @example await client.organizations.bulkDeleteByExternalId(['ext-12345', 'ext-67890']);
   */
  async bulkDeleteByExternalId(organizationExternalIds) {
    return super.delete([
      'organizations',
      'destroy_many',
      {
        external_ids: organizationExternalIds,
      },
    ]);
  }

  /**
   * Searches organizations based on external ID.
   * @param {number} externalID - Search by externalID.
   * @returns {Promise<object[]>} List of organizations matching the search.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/organizations/organizations/#search-organizations-by-external-id}
   * @example const foundOrganizations = await client.organizations.search(1234);
   */
  async search(externalID) {
    return this.getAll(['organizations', 'search', {external_id: externalID}]);
  }

  /**
   * Autocompletes organization names based on provided parameters.
   * @param {object} parameters - Parameters for autocomplete.
   * @returns {Promise<object[]>} List of organizations matching the autocomplete.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/organizations/organizations/#autocomplete-organizations}
   * @example const autocompleteResults = await client.organizations.autocomplete({ name: 'Test' });
   */
  async autocomplete(parameters) {
    return this.getAll(['organizations', 'autocomplete', parameters]);
  }

  /**
   * Incrementally exports organizations with an include parameter.
   * @param {string|Date} startTime - Start time for incremental export.
   * @param {string} include - Data to include in the export.
   * @returns {Promise<object[]>} List of organizations in the incremental export.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/ticket-management/incremental_exports/#incremental-organization-export}
   * @example const exportedOrganizations = await client.organizations.incrementalInclude('2023-01-01T12:00:00Z', 'users');
   */
  async incrementalInclude(startTime, include) {
    return this.getAll([
      'incremental',
      'organizations',
      {start_time: startTime, include},
    ]);
  }

  /**
   * Incrementally exports organizations.
   * @param {string|Date} startTime - Start time for incremental export.
   * @returns {Promise<object[]>} List of organizations in the incremental export.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/ticket-management/incremental_exports/#incremental-organization-export}
   * @example const exportedOrganizations = await client.organizations.incremental('2023-01-01T12:00:00Z');
   */
  async incremental(startTime) {
    return this.getAll([
      'incremental',
      'organizations',
      {start_time: startTime},
    ]);
  }

  /**
   * Fetches a sample of incremental organization exports.
   * @param {string|Date} startTime - Start time for the sample.
   * @returns {Promise<{response: object, result: object[]}>} Sample list of organizations in the incremental export.
   * @see {@link https://developer.zendesk.com/api-reference/ticketing/ticket-management/incremental_exports/#incremental-sample-export}
   * @example const sampleExportedOrganizations = await client.organizations.incrementalSample('2023-01-01T12:00:00Z');
   */
  async incrementalSample(startTime) {
    return this.get([
      'incremental',
      'organizations',
      'sample',
      {start_time: startTime},
    ]);
  }
}

exports.Organizations = Organizations;
